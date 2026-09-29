-- Training Program Evaluation — initial schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

create extension if not exists "pgcrypto";

-- One table: each row is one trainee's evaluation. The trainee types the
-- program header themselves, exactly like the paper form, so there is nothing
-- for HR to set up beforehand — they share one link and courses appear on the
-- dashboard as responses arrive.
create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),
  program_name    text not null,
  program_date    date not null,
  instructors     text[] not null default '{}',
  trainee_name    text,
  ratings         jsonb not null,
  recommendations text,
  created_at      timestamptz not null default now()
);

create index if not exists submissions_created_at_idx
  on public.submissions (created_at desc);

alter table public.submissions enable row level security;

-- Only signed-in HR staff can read the collected evaluations.
drop policy if exists hr_select_submissions on public.submissions;
create policy hr_select_submissions on public.submissions
  for select to authenticated using (true);

-- Anyone with the link can submit, and cannot read anything back.
drop policy if exists public_insert_submissions on public.submissions;
create policy public_insert_submissions on public.submissions
  for insert to anon, authenticated with check (true);
