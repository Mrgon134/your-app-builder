CREATE TABLE IF NOT EXISTS public.app_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous_id TEXT,
  event_name TEXT NOT NULL CHECK (event_name ~ '^[a-z0-9_]{2,64}$'),
  source TEXT NOT NULL DEFAULT 'ios' CHECK (source IN ('ios', 'web', 'server')),
  platform TEXT NOT NULL DEFAULT 'ios',
  app_version TEXT,
  build_number TEXT,
  session_id TEXT,
  screen TEXT,
  context TEXT,
  product_id TEXT,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb
);

COMMENT ON TABLE public.app_events IS 'Lightweight product analytics events from Nuju clients. No journal text or raw media is stored here.';
COMMENT ON COLUMN public.app_events.user_id IS 'Supabase auth user id when available; null for pre-auth events.';
COMMENT ON COLUMN public.app_events.anonymous_id IS 'Client-generated anonymous install identifier for pre-auth funnel stitching.';
COMMENT ON COLUMN public.app_events.properties IS 'Sanitized event metadata only. Do not store journal content, transcripts, or image data.';

CREATE INDEX IF NOT EXISTS idx_app_events_received_at
  ON public.app_events(received_at DESC);

CREATE INDEX IF NOT EXISTS idx_app_events_user_received_at
  ON public.app_events(user_id, received_at DESC)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_app_events_anonymous_received_at
  ON public.app_events(anonymous_id, received_at DESC)
  WHERE anonymous_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_app_events_name_received_at
  ON public.app_events(event_name, received_at DESC);

ALTER TABLE public.app_events ENABLE ROW LEVEL SECURITY;

-- Events are written through the track-event Edge Function with the service role.
-- Keep direct client access closed so analytics data is not exposed through Data API.
REVOKE ALL ON TABLE public.app_events FROM anon;
REVOKE ALL ON TABLE public.app_events FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.app_events TO service_role;
