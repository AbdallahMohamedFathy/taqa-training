import type { Attendance } from "./types";

/** One day's register — the unit an attendance sheet is printed for. */
export type Session = {
  key: string;
  date: string;
  /** Every distinct program the day's attendees named — shown, never grouped on. */
  programs: string[];
  attendees: Attendance[];
};

/**
 * Groups sign-ins by day, and only by day.
 *
 * Attendees do type a program name, but it is deliberately not part of the
 * key: two people writing "AD" and "AR" for the same session used to produce
 * two half-empty sheets. The typed names ride along on `programs` for the
 * header, where being approximate costs nothing.
 */
export function groupSessions(rows: Attendance[]): Session[] {
  const days = new Map<string, Attendance[]>();
  for (const row of rows) {
    const list = days.get(row.attended_on) ?? [];
    list.push(row);
    days.set(row.attended_on, list);
  }

  return [...days.entries()]
    .map(([date, list]) => ({
      key: date,
      date,
      programs: [
        ...new Set(list.map((r) => r.program_name?.trim()).filter(Boolean)),
      ].sort() as string[],
      // Sheet order is arrival order, which is what a paper register shows.
      attendees: [...list].sort((a, b) =>
        a.created_at.localeCompare(b.created_at),
      ),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
