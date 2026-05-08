-- Reduce remaining Supabase security advisor noise without opening customer data.

create or replace function public.check_entry_limit(p_user_id uuid)
returns boolean
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
begin
  if (select auth.uid()) is distinct from p_user_id then
    return false;
  end if;

  return true;
end;
$$;

create or replace function public.check_coach_limit(p_user_id uuid)
returns boolean
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_plan text;
  v_count integer;
  v_trial_start timestamptz;
begin
  if (select auth.uid()) is distinct from p_user_id then
    return false;
  end if;

  select plan, trial_started_at
  into v_plan, v_trial_start
  from public.profiles
  where id = p_user_id;

  if v_plan in ('plus', 'pro', 'weekly', 'three_month', 'yearly', 'lifetime') then
    return true;
  end if;

  if v_trial_start is not null and v_trial_start + interval '7 days' > now() then
    return true;
  end if;

  select count(*)
  into v_count
  from public.coach_messages
  where user_id = p_user_id
    and role = 'user'
    and created_at >= date_trunc('week', now());

  return v_count < 5;
end;
$$;

create or replace function public.update_streak(p_user_id uuid)
returns void
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_last date;
  v_cur integer;
  v_long integer;
begin
  if (select auth.uid()) is distinct from p_user_id then
    return;
  end if;

  select streak_last_date, streak_current, streak_longest
  into v_last, v_cur, v_long
  from public.profiles
  where id = p_user_id;

  if v_last = current_date then
    return;
  elsif v_last = current_date - 1 then
    v_cur := coalesce(v_cur, 0) + 1;
  else
    v_cur := 1;
  end if;

  if v_cur > coalesce(v_long, 0) then
    v_long := v_cur;
  end if;

  update public.profiles
  set
    streak_current = v_cur,
    streak_longest = v_long,
    streak_last_date = current_date,
    total_entries = coalesce(total_entries, 0) + 1,
    last_active_at = now(),
    updated_at = now()
  where id = p_user_id;
end;
$$;

revoke all on function public.check_entry_limit(uuid) from public;
revoke all on function public.check_coach_limit(uuid) from public;
revoke all on function public.update_streak(uuid) from public;
grant execute on function public.check_entry_limit(uuid) to authenticated;
grant execute on function public.check_coach_limit(uuid) to authenticated;
grant execute on function public.update_streak(uuid) to authenticated;

drop policy if exists checkout_purchase_intents_deny_client_access on public.checkout_purchase_intents;
create policy checkout_purchase_intents_deny_client_access
  on public.checkout_purchase_intents for all to anon, authenticated
  using (false)
  with check (false);

drop policy if exists email_suppression_list_deny_client_access on public.email_suppression_list;
create policy email_suppression_list_deny_client_access
  on public.email_suppression_list for all to anon, authenticated
  using (false)
  with check (false);

drop policy if exists lifecycle_email_events_deny_client_access on public.lifecycle_email_events;
create policy lifecycle_email_events_deny_client_access
  on public.lifecycle_email_events for all to anon, authenticated
  using (false)
  with check (false);

drop policy if exists onboarding_leads_deny_client_access on public.onboarding_leads;
create policy onboarding_leads_deny_client_access
  on public.onboarding_leads for all to anon, authenticated
  using (false)
  with check (false);

drop policy if exists waitlist_insert on public.waitlist;
create policy waitlist_insert
  on public.waitlist for insert to anon, authenticated
  with check (
    email is not null
    and length(email) between 3 and 320
    and position('@' in email) > 1
    and source is not null
    and length(source) between 1 and 80
  );

notify pgrst, 'reload schema';
