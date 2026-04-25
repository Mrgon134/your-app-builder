-- Allow the 3-month subscription plan alongside existing paid plans.
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_plan_check
CHECK (plan IN ('free', 'plus', 'pro', 'weekly', 'three_month', 'yearly', 'lifetime'));

ALTER TABLE public.checkout_purchase_intents DROP CONSTRAINT IF EXISTS checkout_purchase_intents_plan_check;
ALTER TABLE public.checkout_purchase_intents
ADD CONSTRAINT checkout_purchase_intents_plan_check
CHECK (plan IN ('weekly', 'three_month', 'yearly', 'lifetime_one_time'));

-- Premium users on any paid plan should bypass free entry limits.
CREATE OR REPLACE FUNCTION public.check_entry_limit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_plan TEXT;
  v_count INTEGER;
  v_trial_start TIMESTAMPTZ;
BEGIN
  SELECT plan, trial_started_at
  INTO v_plan, v_trial_start
  FROM public.profiles
  WHERE id = p_user_id;

  IF v_plan IN ('plus', 'pro', 'weekly', 'three_month', 'yearly', 'lifetime') THEN
    RETURN true;
  END IF;

  IF v_trial_start IS NOT NULL AND v_trial_start + INTERVAL '7 days' > NOW() THEN
    RETURN true;
  END IF;

  SELECT COUNT(*)
  INTO v_count
  FROM public.entries
  WHERE user_id = p_user_id
    AND created_at >= date_trunc('week', NOW());

  RETURN v_count < 3;
END;
$$;

-- Premium users on any paid plan should bypass free coach limits too.
CREATE OR REPLACE FUNCTION public.check_coach_limit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_plan TEXT;
  v_count INTEGER;
  v_trial_start TIMESTAMPTZ;
BEGIN
  SELECT plan, trial_started_at
  INTO v_plan, v_trial_start
  FROM public.profiles
  WHERE id = p_user_id;

  IF v_plan IN ('plus', 'pro', 'weekly', 'three_month', 'yearly', 'lifetime') THEN
    RETURN true;
  END IF;

  IF v_trial_start IS NOT NULL AND v_trial_start + INTERVAL '7 days' > NOW() THEN
    RETURN true;
  END IF;

  SELECT COUNT(*)
  INTO v_count
  FROM public.coach_messages
  WHERE user_id = p_user_id
    AND role = 'user'
    AND created_at >= date_trunc('week', NOW());

  RETURN v_count < 5;
END;
$$;
