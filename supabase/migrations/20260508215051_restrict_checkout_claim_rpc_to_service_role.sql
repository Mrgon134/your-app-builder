-- This RPC is only called from trusted checkout Edge Functions.
-- Client apps should go through checkout-claim / checkout-claim-pending instead.

revoke all on function public.claim_paid_checkout_by_email(uuid, text, text, text, text, timestamptz) from public;
revoke execute on function public.claim_paid_checkout_by_email(uuid, text, text, text, text, timestamptz) from anon;
revoke execute on function public.claim_paid_checkout_by_email(uuid, text, text, text, text, timestamptz) from authenticated;
grant execute on function public.claim_paid_checkout_by_email(uuid, text, text, text, text, timestamptz) to service_role;

notify pgrst, 'reload schema';
