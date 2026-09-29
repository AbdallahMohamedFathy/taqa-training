import ScoreMeter from "./ScoreMeter";

/** Compact score for table cells: the number in ink, the mark beside it. */
export default function ScorePill({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <bdi className="ltr-nums text-sm font-semibold">{label}</bdi>
      <ScoreMeter value={value} className="w-16" />
    </div>
  );
}
