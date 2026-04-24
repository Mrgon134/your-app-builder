UPDATE public.checkout_purchase_intents
SET
  checkout_session_id = metadata_json #>> '{checkout_response,session_id}',
  updated_at = NOW()
WHERE checkout_session_id IS NULL
  AND NULLIF(metadata_json #>> '{checkout_response,session_id}', '') IS NOT NULL;
