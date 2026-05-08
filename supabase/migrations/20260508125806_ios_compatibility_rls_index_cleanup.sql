-- Keep the iOS-facing compatibility layer fast and aligned with current RLS guidance.

create index if not exists idx_journal_entries_user_id
  on public.journal_entries(user_id);

create index if not exists idx_journal_entries_user_date
  on public.journal_entries(user_id, date desc);

create index if not exists idx_mood_daily_user_date
  on public.mood_daily(user_id, date desc);

create index if not exists idx_duo_pairs_owner_id
  on public.duo_pairs(owner_id);

create index if not exists idx_duo_pairs_partner_id
  on public.duo_pairs(partner_id);

create index if not exists idx_duo_moods_code
  on public.duo_moods(code);

drop policy if exists own_mood_select on public.mood_daily;
create policy own_mood_select
  on public.mood_daily
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

notify pgrst, 'reload schema';
