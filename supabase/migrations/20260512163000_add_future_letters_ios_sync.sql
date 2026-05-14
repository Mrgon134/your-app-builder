create table if not exists public.future_letters (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  deliver_at timestamptz not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.future_letters enable row level security;

drop policy if exists future_letters_select_own on public.future_letters;
create policy future_letters_select_own
  on public.future_letters for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists future_letters_insert_own on public.future_letters;
create policy future_letters_insert_own
  on public.future_letters for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists future_letters_update_own on public.future_letters;
create policy future_letters_update_own
  on public.future_letters for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists future_letters_delete_own on public.future_letters;
create policy future_letters_delete_own
  on public.future_letters for delete to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists future_letters_user_deliver_idx
  on public.future_letters(user_id, deliver_at);

grant select, insert, update, delete on public.future_letters to authenticated;
grant select, insert, update, delete on public.future_letters to service_role;
