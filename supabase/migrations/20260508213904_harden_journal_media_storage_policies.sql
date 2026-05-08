-- Tighten journal media storage access for iOS voice/photo uploads.
-- Buckets stay private and objects are only readable/writable by the owning user folder.

drop policy if exists "Photos are publicly readable" on storage.objects;
drop policy if exists "Users can delete own photos" on storage.objects;
drop policy if exists "Users can update own photos" on storage.objects;
drop policy if exists "Users can upload photos to own folder" on storage.objects;
drop policy if exists "voice_entries_select" on storage.objects;

drop policy if exists "Users can read own photo entries" on storage.objects;
drop policy if exists "Users can upload own photo entries" on storage.objects;
drop policy if exists "Users can update own photo entries" on storage.objects;
drop policy if exists "Users can delete own photo entries" on storage.objects;

drop policy if exists "Users can read own voice entries" on storage.objects;
drop policy if exists "Users can upload own voice entries" on storage.objects;
drop policy if exists "Users can update own voice entries" on storage.objects;
drop policy if exists "Users can delete own voice entries" on storage.objects;
drop policy if exists "voice_entries_insert" on storage.objects;

create policy "Users can read own photo entries"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'photo-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can upload own photo entries"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'photo-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can update own photo entries"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'photo-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'photo-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can delete own photo entries"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'photo-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can read own voice entries"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'voice-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can upload own voice entries"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'voice-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can update own voice entries"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'voice-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'voice-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can delete own voice entries"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'voice-entries'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
