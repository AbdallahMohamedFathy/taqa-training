import { programKey } from "./program-key";
import type { Attendance } from "./types";

/** One course on one day — the unit an attendance sheet is printed for. */
export type Session = {
  key: string;
  programName: string;
  date: string;
  attendees: Attendance[];
};

/**
 * Groups sign-ins into sessions. Names come from HR's dropdown so they already
 * match exactly, but `programKey` also folds any older free-typed spellings.
 */
export function groupSessions(rows: Attendance[]): Session[] {
  const sessions = new Map<string, Attendance[]>();
  for (const row of rows) {
    const key = `${programKey(row.program_name)}|${row.attended_on}`;
    const list = sessions.get(key) ?? [];
    list.push(row);
    sessions.set(key, list);
  }

  return [...sessions.entries()]
    .map(([key, list]) => ({
      key,
      programName: list[0].program_name,
      date: list[0].attended_on,
      // Sheet order is arrival order, which is what a paper register shows.
      attendees: [...list].sort((a, b) =>
        a.created_at.localeCompare(b.created_at),
      ),
    }))
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        a.programName.localeCompare(b.programName),
    );
}
