-- Attendance register. Attendees scan a QR, pick their course from HR's list,
-- and enter their name and department. Run this in the Supabase SQL Editor.

create table if not exists public.attendance (
  id           uuid primary key default gen_random_uuid(),
  program_name text not null,
  attended_on  date not null default (now() at time zone 'utc')::date,
  name         text not null,
  department   text not null,
  created_at   timestamptz not null default now()
);

create index if not exists attendance_session_idx
  on public.attendance (program_name, attended_on, created_at);

alter table public.attendance enable row level security;

-- Anyone with the link can sign in for a session, and cannot read the register.
drop policy if exists public_insert_attendance on public.attendance;
create policy public_insert_attendance on public.attendance
  for insert to anon, authenticated with check (true);

-- Only signed-in HR staff read or clean up the register.
drop policy if exists hr_select_attendance on public.attendance;
create policy hr_select_attendance on public.attendance
  for select to authenticated using (true);

drop policy if exists hr_delete_attendance on public.attendance;
create policy hr_delete_attendance on public.attendance
  for delete to authenticated using (true);
