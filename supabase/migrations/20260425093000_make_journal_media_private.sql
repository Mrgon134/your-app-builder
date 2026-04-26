-- Lock down previously public journal media buckets. Entries store object paths;
-- the client reads media through short-lived signed URLs.

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('voice-entries', 'voice-entries', false),
  ('photo-entries', 'photo-entries', false)
ON CONFLICT (id) DO UPDATE SET public = false;

DROP POLICY IF EXISTS "Voice entries are publicly readable" ON storage.objects;
DROP POLICY IF EXISTS "Photo entries are publicly readable" ON storage.objects;

DROP POLICY IF EXISTS "Users can read own voice entries" ON storage.objects;
CREATE POLICY "Users can read own voice entries"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'voice-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Users can read own photo entries" ON storage.objects;
CREATE POLICY "Users can read own photo entries"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'photo-entries'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
