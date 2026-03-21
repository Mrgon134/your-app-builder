
-- Drop existing tables and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_entries_updated_at ON public.entries;
DROP TRIGGER IF EXISTS update_streaks_updated_at ON public.streaks;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP TABLE IF EXISTS public.streaks CASCADE;
DROP TABLE IF EXISTS public.entries CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ============================================================
-- NUJU.APP — Supabase Database Schema per CLAUDE.md spec
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (extends auth.users) - matches spec exactly
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  language TEXT DEFAULT 'en',
  dark_mode BOOLEAN DEFAULT false,
  timezone TEXT DEFAULT 'UTC',
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','plus','pro')),
  plan_expires_at TIMESTAMPTZ,
  lemon_customer_id TEXT,
  lemon_subscription_id TEXT,
  streak_current INTEGER DEFAULT 0,
  streak_longest INTEGER DEFAULT 0,
  streak_last_date DATE,
  total_entries INTEGER DEFAULT 0,
  coach_persona TEXT DEFAULT 'gentle',
  onboarded BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'display_name', 'Journaler'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. JOURNAL ENTRIES
CREATE TABLE public.entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL DEFAULT '',
  mood INTEGER NOT NULL CHECK (mood BETWEEN 1 AND 5),
  energy INTEGER CHECK (energy BETWEEN 0 AND 100),
  ai_summary TEXT,
  ai_mood_label TEXT,
  ai_themes TEXT[],
  ai_sentiment FLOAT,
  ai_people TEXT[],
  audio_url TEXT,
  prompt_text TEXT,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_entries_user_date ON public.entries(user_id, entry_date DESC);

-- 3. AI MEMORY
CREATE TABLE public.ai_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL CHECK (memory_type IN ('pattern','preference','life_event','relationship','goal','trigger')),
  content TEXT NOT NULL,
  confidence FLOAT DEFAULT 0.5,
  source_entry_ids UUID[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_memory_user ON public.ai_memory(user_id, memory_type);

-- 4. MOOD ANALYTICS
CREATE TABLE public.mood_daily (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  avg_mood FLOAT,
  entry_count INTEGER DEFAULT 0,
  dominant_theme TEXT,
  PRIMARY KEY (user_id, date)
);

-- 5. RELATIONSHIPS
CREATE TABLE public.relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  person_name TEXT NOT NULL,
  mention_count INTEGER DEFAULT 1,
  avg_sentiment FLOAT DEFAULT 0,
  themes TEXT[],
  last_mentioned_at TIMESTAMPTZ,
  UNIQUE(user_id, person_name)
);

-- 6. COACH MESSAGES
CREATE TABLE public.coach_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  persona TEXT DEFAULT 'gentle',
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_coach_user ON public.coach_messages(user_id, created_at DESC);

-- 7. WAITLIST
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. STREAK FUNCTION
CREATE OR REPLACE FUNCTION public.update_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE v_last DATE; v_cur INTEGER; v_long INTEGER;
BEGIN
  SELECT streak_last_date, streak_current, streak_longest
  INTO v_last, v_cur, v_long FROM public.profiles WHERE id = p_user_id;
  IF v_last = CURRENT_DATE THEN RETURN;
  ELSIF v_last = CURRENT_DATE - 1 THEN v_cur := v_cur + 1;
  ELSE v_cur := 1; END IF;
  IF v_cur > v_long THEN v_long := v_cur; END IF;
  UPDATE public.profiles SET streak_current=v_cur, streak_longest=v_long,
    streak_last_date=CURRENT_DATE, total_entries=total_entries+1,
    last_active_at=NOW(), updated_at=NOW() WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 9. ENTRY LIMIT CHECK (free = 3/week)
CREATE OR REPLACE FUNCTION public.check_entry_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE v_plan TEXT; v_count INTEGER;
BEGIN
  SELECT plan INTO v_plan FROM public.profiles WHERE id = p_user_id;
  IF v_plan IN ('plus','pro') THEN RETURN true; END IF;
  SELECT COUNT(*) INTO v_count FROM public.entries
  WHERE user_id = p_user_id AND created_at >= date_trunc('week', NOW());
  RETURN v_count < 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_entries_updated_at BEFORE UPDATE ON public.entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_profile_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own_profile_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "own_profile_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "own_entries_select" ON public.entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_entries_insert" ON public.entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own_entries_update" ON public.entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own_entries_delete" ON public.entries FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "own_memory_select" ON public.ai_memory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_memory_insert" ON public.ai_memory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own_mood_select" ON public.mood_daily FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_mood_insert" ON public.mood_daily FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own_rel_select" ON public.relationships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_rel_insert" ON public.relationships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own_rel_update" ON public.relationships FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own_coach_select" ON public.coach_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own_coach_insert" ON public.coach_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "waitlist_insert" ON public.waitlist FOR INSERT WITH CHECK (true);
