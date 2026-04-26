-- Keep private writing and mood logging open on the free plan.
-- Premium gates AI reflection, voice, coach depth, and longer history instead.
CREATE OR REPLACE FUNCTION public.check_entry_limit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN TRUE;
END;
$function$;
