import { RATING_MAX } from "@/lib/form-schema";

/**
 * A single-hue meter: how far a 1–10 score sits along its limit.
 * The unfilled track is a lighter step of the same ramp, so the whole bar
 * carries state. Always rendered LTR — charts read left-to-right.
 */
export default function ScoreMeter({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / RATING_MAX) * 100));

  return (
    <div
      dir="ltr"
      className={`h-2 overflow-hidden rounded-[4px] bg-chart-track ${className}`}
    >
      <div
        className="h-full rounded-r-[4px] bg-chart"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
