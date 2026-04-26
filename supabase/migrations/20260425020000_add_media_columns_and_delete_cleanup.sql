-- Bring the database schema in line with the current app features and make
-- account deletion remove user-owned storage objects as well as journal rows.

ALTER TABLE public.entries
ADD COLUMN IF NOT EXISTS photo_url TEXT,
ADD COLUMN IF NOT EXISTS location_lat DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS location_lng DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS location_name TEXT,
ADD COLUMN IF NOT EXISTS capture_type TEXT;

INSERT INTO storage.buckets (id, name, public)
VALUES ('photo-entries', 'photo-entries', false)
ON CONFLICT (id) DO UPDATE SET public = false;

DROP POLICY IF EXISTS "Photo entries are publicly readable" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own photo entries" ON storage.objects;
CREATE POLICY "Users can read own photo entries"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'photo-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can upload own photo entries" ON storage.objects;
CREATE POLICY "Users can upload own photo entries"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'photo-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can update own photo entries" ON storage.objects;
CREATE POLICY "Users can update own photo entries"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'photo-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'photo-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can delete own photo entries" ON storage.objects;
CREATE POLICY "Users can delete own photo entries"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'photo-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP FUNCTION IF EXISTS public.delete_user();

CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS TABLE(success boolean, message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  current_user_email text;
  deleted_entries int := 0;
  deleted_profile_rows int := 0;
  deleted_ai_memory int := 0;
  deleted_mood_daily int := 0;
  deleted_relationships int := 0;
  deleted_coach_messages int := 0;
  deleted_onboarding_leads int := 0;
  deleted_storage_objects int := 0;
  anonymized_purchase_intents int := 0;
BEGIN
  current_user_id := auth.uid();

  IF current_user_id IS NULL THEN
    RETURN QUERY SELECT false, 'Not authenticated'::text;
    RETURN;
  END IF;

  SELECT email
  INTO current_user_email
  FROM auth.users
  WHERE id = current_user_id;

  IF to_regclass('storage.objects') IS NOT NULL THEN
    DELETE FROM storage.objects
    WHERE bucket_id IN ('voice-entries', 'photo-entries')
      AND name LIKE current_user_id::text || '/%';
    GET DIAGNOSTICS deleted_storage_objects = ROW_COUNT;
  END IF;

  IF to_regclass('public.coach_messages') IS NOT NULL THEN
    DELETE FROM public.coach_messages WHERE user_id = current_user_id;
    GET DIAGNOSTICS deleted_coach_messages = ROW_COUNT;
  END IF;

  IF to_regclass('public.ai_memory') IS NOT NULL THEN
    DELETE FROM public.ai_memory WHERE user_id = current_user_id;
    GET DIAGNOSTICS deleted_ai_memory = ROW_COUNT;
  END IF;

  IF to_regclass('public.mood_daily') IS NOT NULL THEN
    DELETE FROM public.mood_daily WHERE user_id = current_user_id;
    GET DIAGNOSTICS deleted_mood_daily = ROW_COUNT;
  END IF;

  IF to_regclass('public.relationships') IS NOT NULL THEN
    DELETE FROM public.relationships WHERE user_id = current_user_id;
    GET DIAGNOSTICS deleted_relationships = ROW_COUNT;
  END IF;

  IF to_regclass('public.onboarding_leads') IS NOT NULL THEN
    DELETE FROM public.onboarding_leads
    WHERE user_id = current_user_id
      OR (
        current_user_email IS NOT NULL
        AND email IS NOT NULL
        AND lower(email) = lower(current_user_email)
      );
    GET DIAGNOSTICS deleted_onboarding_leads = ROW_COUNT;
  END IF;

  IF to_regclass('public.checkout_purchase_intents') IS NOT NULL THEN
    UPDATE public.checkout_purchase_intents
    SET
      claimed_user_id = NULL,
      email = concat('deleted+', id::text, '@nuju.local'),
      name = NULL,
      metadata_json = metadata_json
        - 'checkout_email'
        - 'checkout_name'
        - 'user_id'
        - 'user_email'
        - 'user_name',
      updated_at = now()
    WHERE claimed_user_id = current_user_id
      OR (
        current_user_email IS NOT NULL
        AND lower(email) = lower(current_user_email)
      );
    GET DIAGNOSTICS anonymized_purchase_intents = ROW_COUNT;
  END IF;

  IF to_regclass('public.entries') IS NOT NULL THEN
    DELETE FROM public.entries WHERE user_id = current_user_id;
    GET DIAGNOSTICS deleted_entries = ROW_COUNT;
  END IF;

  IF to_regclass('public.streaks') IS NOT NULL THEN
    EXECUTE 'DELETE FROM public.streaks WHERE user_id = $1'
    USING current_user_id;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'user_id'
  ) THEN
    EXECUTE 'DELETE FROM public.profiles WHERE user_id = $1'
    USING current_user_id;
  ELSE
    EXECUTE 'DELETE FROM public.profiles WHERE id = $1'
    USING current_user_id;
  END IF;
  GET DIAGNOSTICS deleted_profile_rows = ROW_COUNT;

  DELETE FROM auth.users WHERE id = current_user_id;

  RETURN QUERY SELECT
    true,
    format(
      'Account deleted. Removed %s journal entries, %s storage files, %s AI memories, %s mood rows, %s relationships, %s coach messages, %s onboarding rows, anonymized %s purchase records, and removed %s profile rows.',
      deleted_entries,
      deleted_storage_objects,
      deleted_ai_memory,
      deleted_mood_daily,
      deleted_relationships,
      deleted_coach_messages,
      deleted_onboarding_leads,
      anonymized_purchase_intents,
      deleted_profile_rows
    )::text;
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT false, SQLERRM::text;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user() TO authenticated;
