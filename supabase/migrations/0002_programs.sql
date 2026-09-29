-- HR now maintains the list of course names, and the trainee picks one from a
-- dropdown instead of typing it. Run this in the Supabase SQL Editor.

create table if not exists public.programs (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  created_at timestamptz not null default now()
);

alter table public.programs enable row level security;

-- Trainees are anonymous but must read the list to fill the dropdown.
-- Course names are not sensitive, and nothing else lives in this table.
drop policy if exists public_select_programs on public.programs;
create policy public_select_programs on public.programs
  for select to anon, authenticated using (true);

-- Only signed-in HR staff change the list.
drop policy if exists hr_insert_programs on public.programs;
create policy hr_insert_programs on public.programs
  for insert to authenticated with check (true);

drop policy if exists hr_update_programs on public.programs;
create policy hr_update_programs on public.programs
  for update to authenticated using (true) with check (true);

drop policy if exists hr_delete_programs on public.programs;
create policy hr_delete_programs on public.programs
  for delete to authenticated using (true);

-- Lets HR remove a response that was sent by mistake or as a test.
drop policy if exists hr_delete_submissions on public.submissions;
create policy hr_delete_submissions on public.submissions
  for delete to authenticated using (true);
