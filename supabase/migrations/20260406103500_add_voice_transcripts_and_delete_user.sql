ALTER TABLE public.entries
ADD COLUMN IF NOT EXISTS transcript_segments JSONB;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM storage.buckets
    WHERE id = 'voice-entries'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('voice-entries', 'voice-entries', true);
  END IF;
END $$;

DROP POLICY IF EXISTS "Voice entries are publicly readable" ON storage.objects;
CREATE POLICY "Voice entries are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'voice-entries');

DROP POLICY IF EXISTS "Users can upload own voice entries" ON storage.objects;
CREATE POLICY "Users can upload own voice entries"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'voice-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can update own voice entries" ON storage.objects;
CREATE POLICY "Users can update own voice entries"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'voice-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'voice-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can delete own voice entries" ON storage.objects;
CREATE POLICY "Users can delete own voice entries"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'voice-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
BEGIN
  current_user_id := auth.uid();

  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  DELETE FROM auth.users
  WHERE id = current_user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user() TO authenticated;
