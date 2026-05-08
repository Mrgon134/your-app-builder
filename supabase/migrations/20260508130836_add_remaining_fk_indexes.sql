create index if not exists idx_checkout_purchase_intents_claimed_user_id
  on public.checkout_purchase_intents(claimed_user_id);

create index if not exists idx_lifecycle_email_events_profile_id
  on public.lifecycle_email_events(profile_id);
