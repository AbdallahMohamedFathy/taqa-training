import { formatScore } from "@/lib/scoring";
import ScoreMeter from "./ScoreMeter";

/** Below this, HR should look at the item. Flagged in words, never colour alone. */
export const NEEDS_ATTENTION_BELOW = 6;

export default function ScoreRow({
  primary,
  secondary,
  value,
  needsAttentionLabel,
}: {
  primary: string;
  secondary?: string;
  value: number | null;
  needsAttentionLabel: string;
}) {
  return (
    <div className="py-3.5">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="font-medium leading-snug">{primary}</p>
          {secondary && (
            <p className="mt-0.5 text-xs leading-snug text-muted">{secondary}</p>
          )}
        </div>
        <div className="flex shrink-0 items-baseline gap-2">
          {value !== null && value < NEEDS_ATTENTION_BELOW && (
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-danger">
              {needsAttentionLabel}
            </span>
          )}
          <bdi className="ltr-nums text-base font-semibold">
            {formatScore(value)}
          </bdi>
        </div>
      </div>
      {value !== null && <ScoreMeter value={value} className="mt-2" />}
    </div>
  );
}
