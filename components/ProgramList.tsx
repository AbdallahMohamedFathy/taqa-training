import Link from "next/link";
import ExportExcelButton from "@/components/ExportExcelButton";
import ScorePill from "@/components/ScorePill";
import ShareLink from "@/components/ShareLink";
import { getT } from "@/lib/i18n-server";
import type { ProgramGroup } from "@/lib/program-key";
import { formatScore, overallAverage } from "@/lib/scoring";

/** The HR landing view: every course found in the responses. */
export default async function ProgramList({
  groups,
}: {
  groups: ProgramGroup[];
}) {
  const t = await getT();

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="gradient-text text-3xl font-extrabold tracking-tight">
            {t.list.title}
          </h1>
          <p className="mt-1 text-sm text-muted">{t.list.hint}</p>
        </div>
        <ExportExcelButton groups={groups} />
      </div>

      <ShareLink />

      {groups.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
          <p className="font-medium">{t.list.emptyTitle}</p>
          <p className="mt-1 text-sm text-muted">{t.list.emptyHint}</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-start">
              <thead className="border-b border-line bg-white/40 text-xs font-semibold text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium sm:px-6">
                    {t.list.colProgram}
                  </th>
                  <th className="px-5 py-3 font-medium">{t.list.colDate}</th>
                  <th className="px-5 py-3 font-medium">
                    {t.list.colResponses}
                  </th>
                  <th className="px-5 py-3 font-medium">{t.list.colAverage}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {groups.map((group) => {
                  const average = overallAverage(group.submissions);
                  return (
                    <tr key={group.key} className="transition-colors hover:bg-white/55">
                      <td className="px-5 py-4 sm:px-6">
                        <Link
                          href={`/dashboard/programs/${encodeURIComponent(group.key)}`}
                          className="font-semibold text-brand hover:underline"
                        >
                          {group.name}
                        </Link>
                        {group.instructors.length > 0 && (
                          <p className="mt-0.5 text-xs text-muted">
                            {group.instructors.join("، ")}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm whitespace-nowrap text-muted">
                        <bdi className="ltr-nums">
                          {group.firstDate === group.lastDate
                            ? group.firstDate
                            : `${group.firstDate} → ${group.lastDate}`}
                        </bdi>
                      </td>
                      <td className="px-5 py-4 text-sm">
                        <bdi className="ltr-nums">
                          {group.submissions.length}
                        </bdi>
                      </td>
                      <td className="px-5 py-4">
                        {average === null ? (
                          <span className="text-sm text-muted">—</span>
                        ) : (
                          <ScorePill
                            value={average}
                            label={formatScore(average)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
