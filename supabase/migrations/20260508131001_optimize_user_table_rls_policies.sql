drop policy if exists own_profile_select on public.profiles;
create policy own_profile_select
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists own_profile_update on public.profiles;
create policy own_profile_update
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists own_entries_select on public.entries;
create policy own_entries_select
  on public.entries for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_entries_insert on public.entries;
create policy own_entries_insert
  on public.entries for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists own_entries_update on public.entries;
create policy own_entries_update
  on public.entries for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists own_entries_delete on public.entries;
create policy own_entries_delete
  on public.entries for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_memory_select on public.ai_memory;
create policy own_memory_select
  on public.ai_memory for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_rel_select on public.relationships;
create policy own_rel_select
  on public.relationships for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_coach_select on public.coach_messages;
create policy own_coach_select
  on public.coach_messages for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_coach_insert on public.coach_messages;
create policy own_coach_insert
  on public.coach_messages for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists own_habits_all on public.habits;
drop policy if exists "Users can view own habits" on public.habits;
create policy "Users can view own habits"
  on public.habits for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own habits" on public.habits;
create policy "Users can insert own habits"
  on public.habits for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own habits" on public.habits;
create policy "Users can update own habits"
  on public.habits for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own habits" on public.habits;
create policy "Users can delete own habits"
  on public.habits for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_habit_logs_all on public.habit_logs;
drop policy if exists "Users can view own habit logs" on public.habit_logs;
create policy "Users can view own habit logs"
  on public.habit_logs for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own habit logs" on public.habit_logs;
create policy "Users can insert own habit logs"
  on public.habit_logs for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.habits h
      where h.id = habit_logs.habit_id
        and h.user_id = (select auth.uid())
    )
  );

drop policy if exists "Users can update own habit logs" on public.habit_logs;
create policy "Users can update own habit logs"
  on public.habit_logs for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.habits h
      where h.id = habit_logs.habit_id
        and h.user_id = (select auth.uid())
    )
  );

drop policy if exists "Users can delete own habit logs" on public.habit_logs;
create policy "Users can delete own habit logs"
  on public.habit_logs for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists own_programs_all on public.user_programs;
drop policy if exists own_programs_select on public.user_programs;
drop policy if exists own_programs_insert on public.user_programs;
drop policy if exists own_programs_update on public.user_programs;
drop policy if exists own_programs_delete on public.user_programs;

drop policy if exists "Users can view own programs" on public.user_programs;
create policy "Users can view own programs"
  on public.user_programs for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own programs" on public.user_programs;
create policy "Users can insert own programs"
  on public.user_programs for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own programs" on public.user_programs;
create policy "Users can update own programs"
  on public.user_programs for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own programs" on public.user_programs;
create policy "Users can delete own programs"
  on public.user_programs for delete to authenticated
  using ((select auth.uid()) = user_id);

notify pgrst, 'reload schema';
