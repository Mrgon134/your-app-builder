CREATE OR REPLACE FUNCTION public.claim_paid_checkout_by_email(
  p_intent_id UUID,
  p_email TEXT,
  p_plan TEXT,
  p_customer_id TEXT DEFAULT NULL,
  p_subscription_id TEXT DEFAULT NULL,
  p_next_billing_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_profile_plan TEXT;
  v_plan_expires_at TIMESTAMPTZ;
BEGIN
  IF p_intent_id IS NULL OR NULLIF(TRIM(p_email), '') IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT users.id
  INTO v_user_id
  FROM auth.users
  WHERE LOWER(users.email) = LOWER(TRIM(p_email))
  ORDER BY users.created_at DESC
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.checkout_purchase_intents intents
    WHERE intents.id = p_intent_id
      AND LOWER(intents.email) = LOWER(TRIM(p_email))
      AND intents.status IN ('paid', 'claimed')
      AND (intents.claimed_user_id IS NULL OR intents.claimed_user_id = v_user_id)
  ) THEN
    RETURN NULL;
  END IF;

  v_profile_plan := CASE
    WHEN p_plan IN ('lifetime', 'lifetime_one_time') THEN 'lifetime'
    WHEN p_plan IN ('weekly', 'three_month', 'yearly') THEN p_plan
    ELSE NULL
  END;

  IF v_profile_plan IS NULL THEN
    RETURN NULL;
  END IF;

  v_plan_expires_at := CASE
    WHEN v_profile_plan = 'lifetime' THEN '2099-12-31T23:59:59Z'::TIMESTAMPTZ
    ELSE p_next_billing_date
  END;

  INSERT INTO public.profiles (
    id,
    display_name,
    plan,
    plan_expires_at,
    dodo_customer_id,
    dodo_subscription_id,
    onboarded,
    updated_at
  )
  VALUES (
    v_user_id,
    'Journaler',
    v_profile_plan,
    v_plan_expires_at,
    NULLIF(p_customer_id, ''),
    NULLIF(p_subscription_id, ''),
    TRUE,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    plan = EXCLUDED.plan,
    plan_expires_at = EXCLUDED.plan_expires_at,
    dodo_customer_id = EXCLUDED.dodo_customer_id,
    dodo_subscription_id = EXCLUDED.dodo_subscription_id,
    onboarded = TRUE,
    updated_at = NOW();

  UPDATE public.checkout_purchase_intents
  SET
    claimed_user_id = v_user_id,
    status = 'claimed',
    metadata_json = COALESCE(metadata_json, '{}'::jsonb) || jsonb_build_object(
      'auto_claimed_by_email', TRUE,
      'auto_claimed_at', NOW()
    ),
    updated_at = NOW()
  WHERE id = p_intent_id
    AND (claimed_user_id IS NULL OR claimed_user_id = v_user_id);

  RETURN v_user_id;
END;
$$;
