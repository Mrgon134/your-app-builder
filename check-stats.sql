SELECT count(*) as new_users FROM auth.users WHERE created_at >= NOW() - INTERVAL '1 hour';
SELECT count(*) as new_entries FROM public.entries WHERE created_at >= NOW() - INTERVAL '1 hour';
