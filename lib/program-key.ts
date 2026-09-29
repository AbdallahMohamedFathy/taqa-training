import type { Submission } from "./types";

/**
 * Trainees type the program name by hand, so the same course arrives spelled a
 * few different ways. This folds the differences Arabic typing actually
 * produces — ة/ه, أ/إ/آ/ا, ى/ي, diacritics, tatweel, stray spaces — so those
 * responses group into one course instead of three.
 */
export function programKey(name: string): string {
  return name
    .normalize("NFKC")
    .replace(/[ً-ْـ]/g, "") // harakat + tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[ؤئ]/g, "ء")
    .trim()
    .replace(/\s+/g, "-") // also keeps the key readable as a URL segment
    .toLocaleLowerCase("ar");
}

export type ProgramGroup = {
  key: string;
  /** The spelling most trainees used — what HR sees as the course name. */
  name: string;
  submissions: Submission[];
  firstDate: string;
  lastDate: string;
  /** Every distinct instructor name typed across the group's responses. */
  instructors: string[];
};

/** Groups raw submissions into courses, newest course first. */
export function groupSubmissions(submissions: Submission[]): ProgramGroup[] {
  const groups = new Map<string, Submission[]>();
  for (const submission of submissions) {
    const key = programKey(submission.program_name);
    const list = groups.get(key) ?? [];
    list.push(submission);
    groups.set(key, list);
  }

  return [...groups.entries()]
    .map(([key, rows]) => {
      const dates = rows.map((r) => r.program_date).sort();
      return {
        key,
        name: mostCommon(rows.map((r) => r.program_name)),
        submissions: rows,
        firstDate: dates[0],
        lastDate: dates[dates.length - 1],
        instructors: [...new Set(rows.flatMap((r) => r.instructors))].sort(),
      };
    })
    .sort((a, b) => b.lastDate.localeCompare(a.lastDate));
}

/** Ties break toward the first spelling seen, which keeps the order stable. */
function mostCommon(values: string[]): string {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  let best = values[0];
  let bestCount = 0;
  for (const [value, count] of counts) {
    if (count > bestCount) {
      best = value;
      bestCount = count;
    }
  }
  return best;
}
