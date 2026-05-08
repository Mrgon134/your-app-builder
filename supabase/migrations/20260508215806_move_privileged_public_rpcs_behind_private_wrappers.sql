-- Keep existing public RPC names stable for clients while moving privileged
-- SECURITY DEFINER bodies out of the exposed public schema.

create schema if not exists private;

alter function public.get_lifetime_offer_status() set schema private;
revoke all on function private.get_lifetime_offer_status() from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.get_lifetime_offer_status() to anon, authenticated;

create or replace function public.get_lifetime_offer_status()
returns jsonb
language sql
security invoker
set search_path = public, private, pg_temp
as $$
  select private.get_lifetime_offer_status();
$$;

revoke all on function public.get_lifetime_offer_status() from public;
grant execute on function public.get_lifetime_offer_status() to anon, authenticated;

alter function public.delete_user() set schema private;
revoke all on function private.delete_user() from public;
grant execute on function private.delete_user() to authenticated;

create or replace function public.delete_user()
returns table(success boolean, message text)
language sql
security invoker
set search_path = public, private, pg_temp
as $$
  select * from private.delete_user();
$$;

revoke all on function public.delete_user() from public;
grant execute on function public.delete_user() to authenticated;

notify pgrst, 'reload schema';
