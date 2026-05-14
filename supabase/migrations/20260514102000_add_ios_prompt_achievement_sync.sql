create table if not exists public.prompt_pack_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  pack_id text not null,
  answered_indices integer[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, pack_id)
);

alter table public.prompt_pack_progress enable row level security;

drop policy if exists prompt_pack_progress_select_own on public.prompt_pack_progress;
create policy prompt_pack_progress_select_own
  on public.prompt_pack_progress for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists prompt_pack_progress_insert_own on public.prompt_pack_progress;
create policy prompt_pack_progress_insert_own
  on public.prompt_pack_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists prompt_pack_progress_update_own on public.prompt_pack_progress;
create policy prompt_pack_progress_update_own
  on public.prompt_pack_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists prompt_pack_progress_delete_own on public.prompt_pack_progress;
create policy prompt_pack_progress_delete_own
  on public.prompt_pack_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists prompt_pack_progress_user_updated_idx
  on public.prompt_pack_progress(user_id, updated_at desc);

grant select, insert, update, delete on public.prompt_pack_progress to authenticated;
grant select, insert, update, delete on public.prompt_pack_progress to service_role;

create table if not exists public.achievement_unlocks (
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

alter table public.achievement_unlocks enable row level security;

drop policy if exists achievement_unlocks_select_own on public.achievement_unlocks;
create policy achievement_unlocks_select_own
  on public.achievement_unlocks for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists achievement_unlocks_insert_own on public.achievement_unlocks;
create policy achievement_unlocks_insert_own
  on public.achievement_unlocks for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists achievement_unlocks_update_own on public.achievement_unlocks;
create policy achievement_unlocks_update_own
  on public.achievement_unlocks for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists achievement_unlocks_delete_own on public.achievement_unlocks;
create policy achievement_unlocks_delete_own
  on public.achievement_unlocks for delete to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists achievement_unlocks_user_unlocked_idx
  on public.achievement_unlocks(user_id, unlocked_at desc);

grant select, insert, update, delete on public.achievement_unlocks to authenticated;
grant select, insert, update, delete on public.achievement_unlocks to service_role;
