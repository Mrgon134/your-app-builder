
-- Update check_entry_limit to also allow access during active trial (7 days)
CREATE OR REPLACE FUNCTION public.check_entry_limit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_plan TEXT; v_count INTEGER; v_trial_start TIMESTAMPTZ;
BEGIN
  SELECT plan, trial_started_at INTO v_plan, v_trial_start FROM public.profiles WHERE id = p_user_id;
  -- Paid users always allowed
  IF v_plan IN ('plus','pro') THEN RETURN true; END IF;
  -- Active trial users allowed (7 days)
  IF v_trial_start IS NOT NULL AND v_trial_start + INTERVAL '7 days' > NOW() THEN RETURN true; END IF;
  -- Free users: 3 per week
  SELECT COUNT(*) INTO v_count FROM public.entries
  WHERE user_id = p_user_id AND created_at >= date_trunc('week', NOW());
  RETURN v_count < 3;
END;
$$;

-- Update check_coach_limit to also allow access during active trial
CREATE OR REPLACE FUNCTION public.check_coach_limit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_plan TEXT; v_count INTEGER; v_trial_start TIMESTAMPTZ;
BEGIN
  SELECT plan, trial_started_at INTO v_plan, v_trial_start FROM public.profiles WHERE id = p_user_id;
  -- Paid users always allowed
  IF v_plan IN ('plus','pro') THEN RETURN true; END IF;
  -- Active trial users allowed
  IF v_trial_start IS NOT NULL AND v_trial_start + INTERVAL '7 days' > NOW() THEN RETURN true; END IF;
  -- Free users: 5 per week
  SELECT COUNT(*) INTO v_count FROM public.coach_messages
  WHERE user_id = p_user_id AND role = 'user' AND created_at >= date_trunc('week', NOW());
  RETURN v_count < 5;
END;
$$;
