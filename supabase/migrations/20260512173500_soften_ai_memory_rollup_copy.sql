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
  program_title text;
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
        'Your recent check-ins have felt %s. Ju is using that mood rhythm to respond with the right amount of care.',
        mood_tone
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
        'When your mood dips, Ju should slow down with you and make the next prompt softer.',
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
          'You have been using %s voice reflections and %s photo-backed moments, so Ju can understand more than mood alone.',
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
      program_title := case program_row.program_id
        when 'gratitude-7' then 'Gratitude Journey'
        when 'stress-relief-5' then 'Stress Relief Reset'
        when 'self-discovery-14' then 'Know Yourself'
        when 'morning-clarity-7' then 'Morning Clarity'
        when 'resilience-10' then 'Resilience Builder'
        when 'calm7' then '7 Days of Calm'
        when 'rebuild14' then '14 Days After a Hard Week'
        when 'morning21' then '21-Day Morning Ritual'
        when 'sleep10' then '10 Nights to Better Sleep'
        else program_row.program_id
      end;

      insert into public.ai_memory (user_id, memory_type, content, confidence, source_entry_ids)
      values (
        user_row.user_id,
        'goal',
        format(
          'Your guided path is %s, around day %s, so Ju can connect that practice to your reflections.',
          program_title,
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
