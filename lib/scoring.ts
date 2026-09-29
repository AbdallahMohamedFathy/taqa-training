import { ALL_ITEM_KEYS, SECTIONS } from "./form-schema";
import type { Ratings, Submission } from "./types";

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** Average of every answered item in one submission. */
export function submissionAverage(ratings: Ratings): number | null {
  return mean(ALL_ITEM_KEYS.map((k) => ratings[k]).filter(isScore));
}

/** Average per item across submissions, keyed by item key. */
export function itemAverages(submissions: Submission[]): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  for (const key of ALL_ITEM_KEYS) {
    out[key] = mean(submissions.map((s) => s.ratings?.[key]).filter(isScore));
  }
  return out;
}

/** Average per section across submissions, keyed by section key. */
export function sectionAverages(submissions: Submission[]): Record<string, number | null> {
  const out: Record<string, number | null> = {};
  for (const section of SECTIONS) {
    const keys = section.items.map((i) => i.key);
    const values = submissions.flatMap((s) =>
      keys.map((k) => s.ratings?.[k]).filter(isScore),
    );
    out[section.key] = mean(values);
  }
  return out;
}

/** Average across every item of every submission. */
export function overallAverage(submissions: Submission[]): number | null {
  return mean(
    submissions.flatMap((s) => ALL_ITEM_KEYS.map((k) => s.ratings?.[k]).filter(isScore)),
  );
}

export function formatScore(value: number | null): string {
  return value === null ? "—" : value.toFixed(1);
}

function isScore(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}
