
-- Check coach message limit: free = 5/week, plus/pro = unlimited
CREATE OR REPLACE FUNCTION public.check_coach_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE v_plan TEXT; v_count INTEGER;
BEGIN
  SELECT plan INTO v_plan FROM public.profiles WHERE id = p_user_id;
  IF v_plan IN ('plus','pro') THEN RETURN true; END IF;
  SELECT COUNT(*) INTO v_count FROM public.coach_messages
  WHERE user_id = p_user_id AND role = 'user' AND created_at >= date_trunc('week', NOW());
  RETURN v_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
