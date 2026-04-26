CREATE TABLE IF NOT EXISTS public.user_programs (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id TEXT NOT NULL,
  current_day INTEGER NOT NULL DEFAULT 1,
  completed BOOLEAN NOT NULL DEFAULT false,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, program_id)
);

ALTER TABLE public.user_programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own programs" ON public.user_programs;
CREATE POLICY "Users can view own programs"
ON public.user_programs FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own programs" ON public.user_programs;
CREATE POLICY "Users can insert own programs"
ON public.user_programs FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own programs" ON public.user_programs;
CREATE POLICY "Users can update own programs"
ON public.user_programs FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own programs" ON public.user_programs;
CREATE POLICY "Users can delete own programs"
ON public.user_programs FOR DELETE TO authenticated
USING (auth.uid() = user_id);
