CREATE OR REPLACE FUNCTION public.get_lifetime_offer_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actual_count integer := 0;
BEGIN
  WITH paid_lifetime_intents AS (
    SELECT DISTINCT id, claimed_user_id
    FROM public.checkout_purchase_intents
    WHERE plan = 'lifetime_one_time'
      AND status IN ('paid', 'claimed')
  ),
  legacy_lifetime_profiles AS (
    SELECT profiles.id
    FROM public.profiles
    WHERE profiles.plan = 'lifetime'
      AND NOT EXISTS (
        SELECT 1
        FROM paid_lifetime_intents
        WHERE paid_lifetime_intents.claimed_user_id = profiles.id
      )
  )
  SELECT
    (SELECT COUNT(*) FROM paid_lifetime_intents)
    + (SELECT COUNT(*) FROM legacy_lifetime_profiles)
  INTO v_actual_count;

  RETURN jsonb_build_object(
    'actual_count', COALESCE(v_actual_count, 0)
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_lifetime_offer_status() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_lifetime_offer_status() TO anon, authenticated;
