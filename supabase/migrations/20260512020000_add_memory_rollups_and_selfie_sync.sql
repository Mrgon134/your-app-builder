create schema if not exists private;

alter table public.entries
  add column if not exists selfie_url text;

alter table public.journal_entries
  add column if not exists selfie_url text;

comment on column public.entries.selfie_url is 'Private Supabase Storage path for post-entry selfie check images.';
comment on column public.journal_entries.selfie_url is 'Private Supabase Storage path for post-entry selfie check images.';

create index if not exists idx_entries_selfie_url
  on public.entries(selfie_url)
  where selfie_url is not null;

create index if not exists idx_journal_entries_selfie_url
  on public.journal_entries(selfie_url)
  where selfie_url is not null;

create or replace function private.nuju_sync_selfie_url_from_storage()
returns trigger
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  owner_id_text text;
  file_name text;
  entry_id_text text;
  parsed_entry_id uuid;
begin
  if new.bucket_id <> 'photo-entries' then
    return new;
  end if;

  owner_id_text := (storage.foldername(new.name))[1];
  file_name := storage.filename(new.name);

  if owner_id_text is null or file_name is null then
    return new;
  end if;

  if file_name !~* '[-_]selfie\.[^.]+$' then
    return new;
  end if;

  entry_id_text := regexp_replace(file_name, '[-_]selfie\.[^.]+$', '', 'i');

  begin
    parsed_entry_id := entry_id_text::uuid;
  exception when others then
    return new;
  end;

  update public.entries
    set selfie_url = new.name,
        updated_at = now()
    where id = parsed_entry_id
      and user_id::text = owner_id_text;

  update public.journal_entries
    set selfie_url = new.name,
        updated_at = now()
    where id = parsed_entry_id
      and user_id::text = owner_id_text;

  return new;
end;
$$;

drop trigger if exists nuju_sync_selfie_url_from_storage on storage.objects;

create trigger nuju_sync_selfie_url_from_storage
after insert or update of name, bucket_id on storage.objects
for each row
execute function private.nuju_sync_selfie_url_from_storage();

with selfie_objects as (
  select
    o.name,
    (storage.foldername(o.name))[1] as owner_id_text,
    regexp_replace(storage.filename(o.name), '[-_]selfie\.[^.]+$', '', 'i') as entry_id_text,
    row_number() over (
      partition by (storage.foldername(o.name))[1], regexp_replace(storage.filename(o.name), '[-_]selfie\.[^.]+$', '', 'i')
      order by o.updated_at desc nulls last, o.created_at desc nulls last
    ) as rn
  from storage.objects o
  where o.bucket_id = 'photo-entries'
    and storage.filename(o.name) ~* '[-_]selfie\.[^.]+$'
),
valid_selfies as (
  select
    name,
    owner_id_text,
    entry_id_text::uuid as entry_id
  from selfie_objects
  where rn = 1
    and entry_id_text ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
)
update public.entries e
  set selfie_url = s.name,
      updated_at = now()
  from valid_selfies s
  where e.id = s.entry_id
    and e.user_id::text = s.owner_id_text
    and e.selfie_url is distinct from s.name;

with selfie_objects as (
  select
    o.name,
    (storage.foldername(o.name))[1] as owner_id_text,
    regexp_replace(storage.filename(o.name), '[-_]selfie\.[^.]+$', '', 'i') as entry_id_text,
    row_number() over (
      partition by (storage.foldername(o.name))[1], regexp_replace(storage.filename(o.name), '[-_]selfie\.[^.]+$', '', 'i')
      order by o.updated_at desc nulls last, o.created_at desc nulls last
    ) as rn
  from storage.objects o
  where o.bucket_id = 'photo-entries'
    and storage.filename(o.name) ~* '[-_]selfie\.[^.]+$'
),
valid_selfies as (
  select
    name,
    owner_id_text,
    entry_id_text::uuid as entry_id
  from selfie_objects
  where rn = 1
    and entry_id_text ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
)
update public.journal_entries j
  set selfie_url = s.name,
      updated_at = now()
  from valid_selfies s
  where j.id = s.entry_id
    and j.user_id::text = s.owner_id_text
    and j.selfie_url is distinct from s.name;

create or replace function private.nuju_extract_relationship_mentions(input_text text)
returns text[]
language plpgsql
immutable
as $$
declare
  candidate text;
  result text[] := '{}';
  relation_terms text[] := array[
    'mom', 'mother', 'mama', 'dad', 'father', 'papa',
    'partner', 'wife', 'husband', 'girlfriend', 'boyfriend',
    'friend', 'best friend', 'boss', 'coworker', 'colleague',
    'sister', 'brother', 'family', 'therapist'
  ];
  excluded text[] := array[
    'i', 'im', 'ive', 'the', 'and', 'but', 'this', 'that', 'today',
    'yesterday', 'tomorrow', 'morning', 'night', 'week', 'month',
    'nuju', 'ju', 'rough', 'low', 'okay', 'good', 'great', 'english',
    'indonesian', 'bahasa', 'journal', 'mood', 'entry'
  ];
begin
  if input_text is null or length(trim(input_text)) < 3 then
    return result;
  end if;

  foreach candidate in array relation_terms loop
    if input_text ~* ('(^|[^a-z])((my|our|with|about|from|to|for)\s+)' || replace(candidate, ' ', '\s+') || '([^a-z]|$)') then
      result := array_append(result, initcap(candidate));
    end if;
  end loop;

  for candidate in
    select match[2]
    from regexp_matches(input_text, '(^|[^A-Za-z])([A-Z][A-Za-z''-]{2,24})([^A-Za-z]|$)', 'g') as match
  loop
    candidate := regexp_replace(candidate, '[^A-Za-z''-]', '', 'g');
    if length(candidate) >= 3 and not (lower(candidate) = any(excluded)) then
      result := array_append(result, candidate);
    end if;
  end loop;

  return coalesce(
    (
      select array_agg(name order by name)
      from (
        select distinct trim(name) as name
        from unnest(result) as name
        where length(trim(name)) between 3 and 40
        limit 8
      ) names
    ),
    '{}'
  );
end;
$$;

create or replace function private.nuju_refresh_ai_memory_rollups(p_user_id uuid default null)
returns table(processed_users integer, inserted_memories integer, upserted_relationships integer)
language plpgsql
security definer
set search_path = public, private
as $$
declare
  user_row record;
  stats record;
  program_row record;
  relationship_count integer;
  total_users integer := 0;
  total_memories integer := 0;
  total_relationships integer := 0;
  mood_tone text;
  source_ids uuid[];
begin
  for user_row in
    select distinct user_id
    from (
      select e.user_id
      from public.entries e
      where p_user_id is null or e.user_id = p_user_id
      union
      select j.user_id
      from public.journal_entries j
      where p_user_id is null or j.user_id = p_user_id
    ) users
    where user_id is not null
    limit 500
  loop
    with unified_entries as (
      select
        e.id,
        e.user_id,
        e.mood,
        e.energy,
        coalesce(e.entry_date, e.created_at::date) as entry_day,
        e.created_at,
        coalesce(nullif(e.text, ''), e.ai_summary, '') as entry_text,
        e.audio_url,
        e.photo_url,
        e.selfie_url,
        e.capture_type
      from public.entries e
      where e.user_id = user_row.user_id
      union all
      select
        j.id,
        j.user_id,
        j.mood_value as mood,
        greatest(0, least(100, round(coalesce(j.energy, 0.5) * 100)))::integer as energy,
        j.date::date as entry_day,
        j.created_at,
        coalesce(j.note, '') as entry_text,
        null::text as audio_url,
        null::text as photo_url,
        j.selfie_url,
        j.kind as capture_type
      from public.journal_entries j
      where j.user_id = user_row.user_id
        and not exists (select 1 from public.entries e where e.id = j.id)
    ),
    recent_entries as (
      select *
      from unified_entries
      order by created_at desc nulls last
      limit 30
    )
    select
      count(*)::integer as entry_count,
      round(avg(mood)::numeric, 1)::float as avg_mood,
      count(*) filter (where mood <= 2)::integer as low_mood_count,
      count(*) filter (where mood >= 4)::integer as high_mood_count,
      count(*) filter (where audio_url is not null or capture_type in ('talk', 'voice'))::integer as voice_count,
      count(*) filter (where photo_url is not null or selfie_url is not null or capture_type = 'photo')::integer as media_count,
      min(entry_day) as first_day,
      max(entry_day) as last_day,
      array_agg(id order by created_at desc nulls last) as entry_ids
    into stats
    from recent_entries;

    if coalesce(stats.entry_count, 0) = 0 then
      continue;
    end if;

    source_ids := stats.entry_ids[1:8];
    mood_tone := case
      when stats.avg_mood < 2.5 then 'heavy'
      when stats.avg_mood < 3.4 then 'mixed'
      when stats.avg_mood < 4.2 then 'steady'
      else 'lighter'
    end;

    update public.ai_memory
      set is_active = false
      where user_id = user_row.user_id
        and is_active = true
        and memory_type in ('pattern', 'preference', 'goal', 'trigger', 'relationship');

    insert into public.ai_memory (user_id, memory_type, content, confidence, source_entry_ids)
    values (
      user_row.user_id,
      'pattern',
      format(
        'Recent check-ins look %s: %s entries average %s/5, with %s lower-mood moments and %s lighter moments.',
        mood_tone,
        stats.entry_count,
        stats.avg_mood,
        stats.low_mood_count,
        stats.high_mood_count
      ),
      0.82,
      source_ids
    );
    total_memories := total_memories + 1;

    if stats.low_mood_count >= 2 then
      insert into public.ai_memory (user_id, memory_type, content, confidence, source_entry_ids)
      values (
        user_row.user_id,
        'trigger',
        format(
          'Lower-mood entries appear in %s of the last %s check-ins, so Ju should slow down and respond gently in those moments.',
          stats.low_mood_count,
          stats.entry_count
        ),
        0.74,
        source_ids
      );
      total_memories := total_memories + 1;
    end if;

    if stats.voice_count > 0 or stats.media_count > 0 then
      insert into public.ai_memory (user_id, memory_type, content, confidence, source_entry_ids)
      values (
        user_row.user_id,
        'preference',
        format(
          'This user has used richer capture methods recently: %s voice entries and %s media-backed moments.',
          stats.voice_count,
          stats.media_count
        ),
        0.68,
        source_ids
      );
      total_memories := total_memories + 1;
    end if;

    select
      program_id,
      current_day,
      completed
    into program_row
    from public.user_programs
    where user_id = user_row.user_id
    order by completed asc, current_day desc, started_at desc
    limit 1;

    if found and program_row.program_id is not null then
      insert into public.ai_memory (user_id, memory_type, content, confidence, source_entry_ids)
      values (
        user_row.user_id,
        'goal',
        format(
          'They have program progress in %s, currently around day %s.',
          program_row.program_id,
          coalesce(program_row.current_day, 0)
        ),
        0.7,
        source_ids
      );
      total_memories := total_memories + 1;
    end if;

    with unified_entries as (
      select
        e.user_id,
        e.mood,
        e.created_at,
        coalesce(nullif(e.text, ''), e.ai_summary, '') as entry_text
      from public.entries e
      where e.user_id = user_row.user_id
      union all
      select
        j.user_id,
        j.mood_value as mood,
        j.created_at,
        coalesce(j.note, '') as entry_text
      from public.journal_entries j
      where j.user_id = user_row.user_id
        and not exists (select 1 from public.entries e where e.id = j.id)
    ),
    relationship_mentions as (
      select
        user_id,
        person_name,
        count(*)::integer as mention_count,
        avg((mood::float - 3.0) / 2.0)::float as avg_sentiment,
        max(created_at) as last_mentioned_at
      from unified_entries
      cross join lateral unnest(private.nuju_extract_relationship_mentions(entry_text)) as person_name
      where person_name is not null
      group by user_id, person_name
    ),
    upserted as (
      insert into public.relationships (user_id, person_name, mention_count, avg_sentiment, themes, last_mentioned_at)
      select
        user_id,
        person_name,
        mention_count,
        avg_sentiment,
        array['recent entries']::text[],
        last_mentioned_at
      from relationship_mentions
      on conflict (user_id, person_name) do update
        set mention_count = excluded.mention_count,
            avg_sentiment = excluded.avg_sentiment,
            themes = excluded.themes,
            last_mentioned_at = excluded.last_mentioned_at
      returning 1
    )
    select count(*)::integer into relationship_count from upserted;

    total_relationships := total_relationships + coalesce(relationship_count, 0);
    total_users := total_users + 1;
  end loop;

  processed_users := total_users;
  inserted_memories := total_memories;
  upserted_relationships := total_relationships;
  return next;
end;
$$;

revoke all on function private.nuju_refresh_ai_memory_rollups(uuid) from public, anon, authenticated;
revoke all on function private.nuju_extract_relationship_mentions(text) from public, anon, authenticated;

do $do$
declare
  existing_job_id bigint;
begin
  select jobid into existing_job_id
  from cron.job
  where jobname = 'daily-ai-memory-refresh'
  limit 1;

  if existing_job_id is null then
    perform cron.schedule(
      'daily-ai-memory-refresh',
      '15 9 * * *',
      $job$select * from private.nuju_refresh_ai_memory_rollups();$job$
    );
  else
    perform cron.alter_job(
      job_id := existing_job_id,
      schedule := '15 9 * * *',
      command := $job$select * from private.nuju_refresh_ai_memory_rollups();$job$,
      active := true
    );
  end if;
end;
$do$;
