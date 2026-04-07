-- Enhance delete_user function with better error handling and explicit cleanup
-- This replaces the previous delete_user function

CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS TABLE(success boolean, message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
  deleted_profiles int;
  deleted_entries int;
  deleted_streaks int;
BEGIN
  current_user_id := auth.uid();

  IF current_user_id IS NULL THEN
    RETURN QUERY SELECT false, 'Not authenticated'::text;
    RETURN;
  END IF;

  -- Explicitly delete related data (though CASCADE should handle this)
  DELETE FROM public.streaks WHERE user_id = current_user_id;
  GET DIAGNOSTICS deleted_streaks = ROW_COUNT;

  DELETE FROM public.entries WHERE user_id = current_user_id;
  GET DIAGNOSTICS deleted_entries = ROW_COUNT;

  DELETE FROM public.profiles WHERE user_id = current_user_id;
  GET DIAGNOSTICS deleted_profiles = ROW_COUNT;

  -- Finally delete the auth user (this should cascade to remaining records)
  DELETE FROM auth.users WHERE id = current_user_id;

  RETURN QUERY SELECT
    true,
    format('Account deleted. Removed %s profiles, %s entries, %s streaks',
      deleted_profiles, deleted_entries, deleted_streaks)::text;
EXCEPTION WHEN OTHERS THEN
  RETURN QUERY SELECT false, SQLERRM::text;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user() TO authenticated;
