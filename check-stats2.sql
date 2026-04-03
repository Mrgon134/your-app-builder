SELECT count(*) as new_users FROM auth.users WHERE created_at >= NOW() - INTERVAL '1 hour';
