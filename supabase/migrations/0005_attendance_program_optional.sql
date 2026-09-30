-- The register is grouped by day alone, so the program name is a label rather
-- than an identity: it may be blank, and two attendees on the same day may
-- write it differently without splitting the sheet.

alter table public.attendance
  alter column program_name drop not null,
  alter column program_name set default '';

notify pgrst, 'reload schema';
