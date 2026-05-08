-- iOS Swift compatibility layer for the existing Nuju web schema.
-- Keeps the web app's canonical tables intact while exposing the table/column
-- shape expected by the Swift rebuild.

alter table public.profiles
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists is_pro boolean default false,
  add column if not exists subscription_status text,
  add column if not exists subscription_plan text,
  add column if not exists subscription_provider text,
  add column if not exists subscription_expires_at timestamptz;

create or replace function public.nuju_fill_profile_ios_compat()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  user_email text;
  active_plan boolean;
begin
  select u.email into user_email from auth.users u where u.id = new.id;

  new.email := coalesce(nullif(new.email, ''), user_email);
  new.full_name := coalesce(nullif(new.full_name, ''), nullif(new.display_name, ''));
  new.subscription_plan := coalesce(nullif(new.subscription_plan, ''), nullif(new.plan, ''));
  new.subscription_expires_at := coalesce(new.subscription_expires_at, new.plan_expires_at);
  new.subscription_provider := coalesce(
    nullif(new.subscription_provider, ''),
    case
      when new.dodo_customer_id is not null or new.dodo_subscription_id is not null then 'dodo'
      when new.plan is not null and new.plan <> 'free' then 'web'
      else null
    end
  );

  active_plan := coalesce(new.plan, 'free') in ('plus', 'pro', 'weekly', 'three_month', 'yearly', 'lifetime')
    and (new.plan = 'lifetime' or new.plan_expires_at is null or new.plan_expires_at > now());

  new.is_pro := coalesce(new.is_pro, false) or active_plan;
  new.subscription_status := case
    when active_plan then 'active'
    when coalesce(new.plan, 'free') = 'free' then coalesce(nullif(new.subscription_status, ''), 'free')
    else coalesce(nullif(new.subscription_status, ''), 'inactive')
  end;

  return new;
end;
$$;

drop trigger if exists profiles_ios_compat_before_write on public.profiles;
create trigger profiles_ios_compat_before_write
before insert or update on public.profiles
for each row execute function public.nuju_fill_profile_ios_compat();

update public.profiles
set updated_at = coalesce(updated_at, now());

create table if not exists public.journal_entries (
  id uuid primary key default extensions.uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  date timestamptz not null default now(),
  mood_value integer not null default 3 check (mood_value between 1 and 5),
  energy double precision not null default 0.5 check (energy >= 0 and energy <= 1),
  note text not null default '',
  tags text[] not null default '{}',
  kind text not null default 'write',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_entries_user_date_idx
  on public.journal_entries(user_id, date desc);

alter table public.journal_entries enable row level security;

grant select, insert, update, delete on public.journal_entries to authenticated, anon;

drop policy if exists journal_entries_owner_select on public.journal_entries;
create policy journal_entries_owner_select
  on public.journal_entries for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists journal_entries_owner_insert on public.journal_entries;
create policy journal_entries_owner_insert
  on public.journal_entries for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists journal_entries_owner_update on public.journal_entries;
create policy journal_entries_owner_update
  on public.journal_entries for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists journal_entries_owner_delete on public.journal_entries;
create policy journal_entries_owner_delete
  on public.journal_entries for delete to authenticated
  using ((select auth.uid()) = user_id);

alter table public.mood_daily
  add column if not exists mood integer check (mood between 1 and 5),
  add column if not exists mood_value integer check (mood_value between 1 and 5),
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.nuju_fill_mood_daily_ios_compat()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  new.mood_value := coalesce(new.mood_value, new.mood, round(new.avg_mood)::integer);
  new.mood := coalesce(new.mood, new.mood_value, round(new.avg_mood)::integer);
  new.avg_mood := coalesce(new.avg_mood, new.mood_value::double precision, new.mood::double precision);
  new.entry_count := coalesce(new.entry_count, 1);
  new.updated_at := coalesce(new.updated_at, now());
  return new;
end;
$$;

drop trigger if exists mood_daily_ios_compat_before_write on public.mood_daily;
create trigger mood_daily_ios_compat_before_write
before insert or update on public.mood_daily
for each row execute function public.nuju_fill_mood_daily_ios_compat();

grant select, insert, update, delete on public.mood_daily to authenticated, anon;

drop policy if exists own_mood_insert on public.mood_daily;
create policy own_mood_insert
  on public.mood_daily for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists own_mood_update on public.mood_daily;
create policy own_mood_update
  on public.mood_daily for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists own_mood_delete on public.mood_daily;
create policy own_mood_delete
  on public.mood_daily for delete to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.nuju_sync_journal_to_entries()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if pg_trigger_depth() > 1 then
    return coalesce(new, old);
  end if;

  if tg_op = 'DELETE' then
    delete from public.entries where id = old.id;
    return old;
  end if;

  insert into public.entries (
    id,
    user_id,
    text,
    mood,
    energy,
    entry_date,
    created_at,
    updated_at,
    capture_type
  )
  values (
    new.id,
    new.user_id,
    coalesce(new.note, ''),
    coalesce(new.mood_value, 3),
    least(100, greatest(0, round(coalesce(new.energy, 0.5) * 100)::integer)),
    coalesce(new.date::date, current_date),
    coalesce(new.created_at, new.date, now()),
    coalesce(new.updated_at, now()),
    coalesce(nullif(new.kind, ''), 'journal')
  )
  on conflict (id) do update
  set user_id = excluded.user_id,
      mood = excluded.mood,
      text = excluded.text,
      energy = excluded.energy,
      entry_date = excluded.entry_date,
      updated_at = excluded.updated_at,
      capture_type = excluded.capture_type;

  return new;
end;
$$;

drop trigger if exists journal_entries_sync_to_entries on public.journal_entries;
create trigger journal_entries_sync_to_entries
after insert or update or delete on public.journal_entries
for each row execute function public.nuju_sync_journal_to_entries();

create or replace function public.nuju_sync_entries_to_journal()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if pg_trigger_depth() > 1 then
    return coalesce(new, old);
  end if;

  if tg_op = 'DELETE' then
    delete from public.journal_entries where id = old.id;
    return old;
  end if;

  insert into public.journal_entries (
    id,
    user_id,
    date,
    mood_value,
    energy,
    note,
    tags,
    kind,
    created_at,
    updated_at
  )
  values (
    new.id,
    new.user_id,
    coalesce(new.created_at, new.entry_date::timestamptz, now()),
    coalesce(new.mood, 3),
    least(1, greatest(0, coalesce(new.energy, 50)::double precision / 100.0)),
    coalesce(new.text, ''),
    '{}'::text[],
    coalesce(nullif(new.capture_type, ''), 'write'),
    coalesce(new.created_at, now()),
    coalesce(new.updated_at, now())
  )
  on conflict (id) do update set
      user_id = excluded.user_id,
      date = excluded.date,
      mood_value = excluded.mood_value,
      energy = excluded.energy,
      note = excluded.note,
      kind = excluded.kind,
      updated_at = excluded.updated_at;

  return new;
end;
$$;

drop trigger if exists entries_sync_to_journal_entries on public.entries;
create trigger entries_sync_to_journal_entries
after insert or update or delete on public.entries
for each row execute function public.nuju_sync_entries_to_journal();

insert into public.journal_entries (
  id,
  user_id,
  date,
  mood_value,
  energy,
  note,
  tags,
  kind,
  created_at,
  updated_at
)
select
  e.id,
  e.user_id,
  coalesce(e.created_at, e.entry_date::timestamptz, now()),
  coalesce(e.mood, 3),
  greatest(0, least(1, coalesce(e.energy, 50)::double precision / 100.0)),
  coalesce(e.text, ''),
  '{}',
  coalesce(e.capture_type, 'write'),
  coalesce(e.created_at, now()),
  coalesce(e.updated_at, now())
from public.entries e
on conflict (id) do nothing;

create table if not exists public.duo_pairs (
  code text primary key check (code = upper(code) and length(code) between 4 and 12),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  partner_id uuid references public.profiles(id) on delete set null,
  owner_name text,
  partner_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.duo_moods (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  code text not null references public.duo_pairs(code) on delete cascade,
  mood integer not null check (mood between 1 and 5),
  updated_at timestamptz not null default now()
);

create index if not exists duo_pairs_owner_idx
  on public.duo_pairs(owner_id);

create index if not exists duo_pairs_partner_idx
  on public.duo_pairs(partner_id);

create index if not exists duo_moods_code_idx
  on public.duo_moods(code, updated_at desc);

alter table public.duo_pairs enable row level security;
alter table public.duo_moods enable row level security;

grant select, insert, update, delete on public.duo_pairs to authenticated, anon;
grant select, insert, update, delete on public.duo_moods to authenticated, anon;

drop policy if exists duo_pairs_select_related on public.duo_pairs;
create policy duo_pairs_select_related
  on public.duo_pairs for select to authenticated
  using (
    (select auth.uid()) = owner_id
    or (select auth.uid()) = partner_id
    or partner_id is null
  );

drop policy if exists duo_pairs_insert_owner on public.duo_pairs;
create policy duo_pairs_insert_owner
  on public.duo_pairs for insert to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists duo_pairs_update_related on public.duo_pairs;
create policy duo_pairs_update_related
  on public.duo_pairs for update to authenticated
  using (
    (select auth.uid()) = owner_id
    or (select auth.uid()) = partner_id
    or partner_id is null
  )
  with check (
    (select auth.uid()) = owner_id
    or (select auth.uid()) = partner_id
  );

drop policy if exists duo_pairs_delete_related on public.duo_pairs;
create policy duo_pairs_delete_related
  on public.duo_pairs for delete to authenticated
  using ((select auth.uid()) = owner_id or (select auth.uid()) = partner_id);

drop policy if exists duo_moods_select_pair on public.duo_moods;
create policy duo_moods_select_pair
  on public.duo_moods for select to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1
      from public.duo_pairs p
      where p.code = duo_moods.code
        and ((select auth.uid()) = p.owner_id or (select auth.uid()) = p.partner_id)
    )
  );

drop policy if exists duo_moods_insert_own on public.duo_moods;
create policy duo_moods_insert_own
  on public.duo_moods for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists duo_moods_update_own on public.duo_moods;
create policy duo_moods_update_own
  on public.duo_moods for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists duo_moods_delete_own on public.duo_moods;
create policy duo_moods_delete_own
  on public.duo_moods for delete to authenticated
  using ((select auth.uid()) = user_id);

revoke execute on function public.nuju_fill_profile_ios_compat() from public;
revoke execute on function public.nuju_fill_mood_daily_ios_compat() from public;
revoke execute on function public.nuju_sync_journal_to_entries() from public;
revoke execute on function public.nuju_sync_entries_to_journal() from public;

notify pgrst, 'reload schema';
