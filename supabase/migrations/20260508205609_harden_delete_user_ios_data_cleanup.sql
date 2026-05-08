create or replace function public.delete_user()
returns table(success boolean, message text)
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  current_user_id uuid;
  current_user_email text;
  deleted_entries int := 0;
  deleted_journal_entries int := 0;
  deleted_profile_rows int := 0;
  deleted_ai_memory int := 0;
  deleted_mood_daily int := 0;
  deleted_relationships int := 0;
  deleted_coach_messages int := 0;
  deleted_onboarding_leads int := 0;
  deleted_storage_objects int := 0;
  deleted_habit_logs int := 0;
  deleted_habits int := 0;
  deleted_user_programs int := 0;
  deleted_duo_moods int := 0;
  deleted_duo_pairs int := 0;
  anonymized_purchase_intents int := 0;
  row_count_delta int := 0;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    return query select false, 'Not authenticated'::text;
    return;
  end if;

  select email
  into current_user_email
  from auth.users
  where id = current_user_id;

  if to_regclass('storage.objects') is not null then
    delete from storage.objects
    where bucket_id in ('voice-entries', 'photo-entries')
      and name like current_user_id::text || '/%';
    get diagnostics deleted_storage_objects = row_count;
  end if;

  if to_regclass('public.duo_pairs') is not null and to_regclass('public.duo_moods') is not null then
    delete from public.duo_moods m
    using public.duo_pairs p
    where m.code = p.code
      and (p.owner_id = current_user_id or p.partner_id = current_user_id);
    get diagnostics row_count_delta = row_count;
    deleted_duo_moods := deleted_duo_moods + row_count_delta;
  end if;

  if to_regclass('public.duo_moods') is not null then
    delete from public.duo_moods where user_id = current_user_id;
    get diagnostics row_count_delta = row_count;
    deleted_duo_moods := deleted_duo_moods + row_count_delta;
  end if;

  if to_regclass('public.duo_pairs') is not null then
    delete from public.duo_pairs
    where owner_id = current_user_id or partner_id = current_user_id;
    get diagnostics deleted_duo_pairs = row_count;
  end if;

  if to_regclass('public.habit_logs') is not null and to_regclass('public.habits') is not null then
    delete from public.habit_logs
    where user_id = current_user_id
      or habit_id in (select id from public.habits where user_id = current_user_id);
    get diagnostics deleted_habit_logs = row_count;
  elsif to_regclass('public.habit_logs') is not null then
    delete from public.habit_logs where user_id = current_user_id;
    get diagnostics deleted_habit_logs = row_count;
  end if;

  if to_regclass('public.habits') is not null then
    delete from public.habits where user_id = current_user_id;
    get diagnostics deleted_habits = row_count;
  end if;

  if to_regclass('public.user_programs') is not null then
    delete from public.user_programs where user_id = current_user_id;
    get diagnostics deleted_user_programs = row_count;
  end if;

  if to_regclass('public.journal_entries') is not null then
    delete from public.journal_entries where user_id = current_user_id;
    get diagnostics deleted_journal_entries = row_count;
  end if;

  if to_regclass('public.coach_messages') is not null then
    delete from public.coach_messages where user_id = current_user_id;
    get diagnostics deleted_coach_messages = row_count;
  end if;

  if to_regclass('public.ai_memory') is not null then
    delete from public.ai_memory where user_id = current_user_id;
    get diagnostics deleted_ai_memory = row_count;
  end if;

  if to_regclass('public.mood_daily') is not null then
    delete from public.mood_daily where user_id = current_user_id;
    get diagnostics deleted_mood_daily = row_count;
  end if;

  if to_regclass('public.relationships') is not null then
    delete from public.relationships where user_id = current_user_id;
    get diagnostics deleted_relationships = row_count;
  end if;

  if to_regclass('public.onboarding_leads') is not null then
    delete from public.onboarding_leads
    where user_id = current_user_id
      or (
        current_user_email is not null
        and email is not null
        and lower(email) = lower(current_user_email)
      );
    get diagnostics deleted_onboarding_leads = row_count;
  end if;

  if to_regclass('public.checkout_purchase_intents') is not null then
    update public.checkout_purchase_intents
    set
      claimed_user_id = null,
      email = concat('deleted+', id::text, '@nuju.local'),
      name = null,
      metadata_json = metadata_json
        - 'checkout_email'
        - 'checkout_name'
        - 'user_id'
        - 'user_email'
        - 'user_name',
      updated_at = now()
    where claimed_user_id = current_user_id
      or (
        current_user_email is not null
        and lower(email) = lower(current_user_email)
      );
    get diagnostics anonymized_purchase_intents = row_count;
  end if;

  if to_regclass('public.entries') is not null then
    delete from public.entries where user_id = current_user_id;
    get diagnostics deleted_entries = row_count;
  end if;

  if to_regclass('public.streaks') is not null then
    execute 'delete from public.streaks where user_id = $1'
    using current_user_id;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'user_id'
  ) then
    execute 'delete from public.profiles where user_id = $1'
    using current_user_id;
  else
    execute 'delete from public.profiles where id = $1'
    using current_user_id;
  end if;
  get diagnostics deleted_profile_rows = row_count;

  delete from auth.users where id = current_user_id;

  return query select
    true,
    format(
      'Account deleted. Removed %s web entries, %s iOS journal entries, %s storage files, %s habit logs, %s habits, %s program rows, %s duo moods, %s duo pairs, %s AI memories, %s mood rows, %s relationships, %s coach messages, %s onboarding rows, anonymized %s purchase records, and removed %s profile rows.',
      deleted_entries,
      deleted_journal_entries,
      deleted_storage_objects,
      deleted_habit_logs,
      deleted_habits,
      deleted_user_programs,
      deleted_duo_moods,
      deleted_duo_pairs,
      deleted_ai_memory,
      deleted_mood_daily,
      deleted_relationships,
      deleted_coach_messages,
      deleted_onboarding_leads,
      anonymized_purchase_intents,
      deleted_profile_rows
    )::text;
exception when others then
  return query select false, sqlerrm::text;
end;
$$;

revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
