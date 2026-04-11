CREATE OR REPLACE FUNCTION public.get_lifetime_offer_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actual_count integer := 0;
BEGIN
  SELECT COUNT(*)::integer
  INTO v_actual_count
  FROM public.profiles
  WHERE plan = 'lifetime';

  RETURN jsonb_build_object(
    'actual_count', v_actual_count
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_lifetime_offer_status() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_lifetime_offer_status() TO anon, authenticated;
