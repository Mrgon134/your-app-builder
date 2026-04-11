CREATE TABLE IF NOT EXISTS public.checkout_purchase_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  checkout_session_id TEXT,
  payment_id TEXT,
  subscription_id TEXT,
  email TEXT NOT NULL,
  name TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('weekly', 'yearly', 'lifetime_one_time')),
  source TEXT NOT NULL DEFAULT 'onboarding',
  status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'processing', 'paid', 'claimed', 'expired', 'failed')),
  claimed_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  metadata_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checkout_purchase_intents_session_id
  ON public.checkout_purchase_intents(session_id);

CREATE INDEX IF NOT EXISTS idx_checkout_purchase_intents_email_status
  ON public.checkout_purchase_intents(email, status);

CREATE INDEX IF NOT EXISTS idx_checkout_purchase_intents_checkout_session_id
  ON public.checkout_purchase_intents(checkout_session_id);

CREATE INDEX IF NOT EXISTS idx_checkout_purchase_intents_payment_id
  ON public.checkout_purchase_intents(payment_id);

CREATE INDEX IF NOT EXISTS idx_checkout_purchase_intents_subscription_id
  ON public.checkout_purchase_intents(subscription_id);

ALTER TABLE public.checkout_purchase_intents ENABLE ROW LEVEL SECURITY;
