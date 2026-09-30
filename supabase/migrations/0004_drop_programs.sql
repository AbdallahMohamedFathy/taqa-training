-- The course catalog is gone: trainees and attendees type the program name
-- themselves again, and both the results dashboard and the attendance register
-- group on that typed name (normalised by programKey in lib/program-key.ts).
--
-- Nothing referenced this table by key — submissions and attendance always
-- stored the name as text — so dropping it loses no recorded data.

drop table if exists public.programs;

notify pgrst, 'reload schema';
