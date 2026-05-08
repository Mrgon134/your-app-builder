alter function public.update_updated_at_column() set search_path = public, pg_temp;
alter function public.handle_new_user() set search_path = public, pg_temp;
alter function public.update_streak(uuid) set search_path = public, pg_temp;

revoke all on function public.update_updated_at_column() from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;

revoke all on function public.check_entry_limit(uuid) from public, anon;
grant execute on function public.check_entry_limit(uuid) to authenticated;

revoke all on function public.check_coach_limit(uuid) from public, anon;
grant execute on function public.check_coach_limit(uuid) to authenticated;

revoke all on function public.update_streak(uuid) from public, anon;
grant execute on function public.update_streak(uuid) to authenticated;

revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
