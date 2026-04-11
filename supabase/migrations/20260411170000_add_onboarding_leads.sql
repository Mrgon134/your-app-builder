CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.onboarding_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'landing',
  email TEXT,
  name TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  reveal JSONB,
  selected_plan TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_leads_email ON public.onboarding_leads(email);
CREATE INDEX IF NOT EXISTS idx_onboarding_leads_user_id ON public.onboarding_leads(user_id);

ALTER TABLE public.onboarding_leads ENABLE ROW LEVEL SECURITY;
