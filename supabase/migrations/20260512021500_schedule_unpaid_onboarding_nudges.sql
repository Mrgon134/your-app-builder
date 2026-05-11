create table if not exists public.edge_function_cron_secrets (
  name text primary key,
  secret text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.edge_function_cron_secrets enable row level security;

revoke all on table public.edge_function_cron_secrets from anon, authenticated;

insert into public.edge_function_cron_secrets (name, secret)
values (
  'send-unpaid-onboarding-nudges',
  replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '')
)
on conflict (name) do nothing;

do $do$
declare
  existing_job_id bigint;
begin
  select jobid into existing_job_id
  from cron.job
  where jobname = 'daily-unpaid-onboarding-nudges'
  limit 1;

  if existing_job_id is null then
    perform cron.schedule(
      'daily-unpaid-onboarding-nudges',
      '30 9 * * *',
      $job$
        select net.http_post(
          url := 'https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/send-unpaid-onboarding-nudges',
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || (
              select secret
              from public.edge_function_cron_secrets
              where name = 'send-unpaid-onboarding-nudges'
            )
          ),
          body := '{"dryRun":false,"limit":25}'::jsonb
        ) as request_id;
      $job$
    );
  else
    perform cron.alter_job(
      job_id := existing_job_id,
      schedule := '30 9 * * *',
      command := $job$
        select net.http_post(
          url := 'https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/send-unpaid-onboarding-nudges',
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || (
              select secret
              from public.edge_function_cron_secrets
              where name = 'send-unpaid-onboarding-nudges'
            )
          ),
          body := '{"dryRun":false,"limit":25}'::jsonb
        ) as request_id;
      $job$,
      active := true
    );
  end if;
end;
$do$;
