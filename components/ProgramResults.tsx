import DeleteSubmissionButton from "@/components/DeleteSubmissionButton";
import ScoreMeter from "@/components/ScoreMeter";
import ExportExcelButton from "@/components/ExportExcelButton";
import ScoreRow from "@/components/ScoreRow";
import { SECTIONS } from "@/lib/form-schema";
import { getLang, getT } from "@/lib/i18n-server";
import type { ProgramGroup } from "@/lib/program-key";
import {
  formatScore,
  itemAverages,
  overallAverage,
  sectionAverages,
  submissionAverage,
} from "@/lib/scoring";

/** Everything HR sees for one course. */
export default async function ProgramResults({
  group,
}: {
  group: ProgramGroup;
}) {
  const [lang, t] = await Promise.all([getLang(), getT()]);
  const ar = lang === "ar";
  const { submissions } = group;

  const overall = overallAverage(submissions);
  const bySection = sectionAverages(submissions);
  const byItem = itemAverages(submissions);
  const notes = submissions.filter((s) => s.recommendations?.trim());
  const spellings = new Set(submissions.map((s) => s.program_name));
  const dateRange =
    group.firstDate === group.lastDate
      ? group.firstDate
      : `${group.firstDate} → ${group.lastDate}`;

  return (
    <>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="gradient-text text-3xl font-extrabold tracking-tight sm:text-4xl">
            {group.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            <bdi className="ltr-nums">{dateRange}</bdi>
            {group.instructors.length > 0 &&
              ` · ${group.instructors.join("، ")}`}
          </p>
        </div>
        <ExportExcelButton group={group} />
      </div>

      {spellings.size > 1 && (
        <p className="mt-4 rounded-xl bg-brand-soft px-4 py-3 text-sm leading-relaxed">
          {t.results.spellingNotice(spellings.size)}
        </p>
      )}

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <p className="text-sm text-muted">{t.results.overallAverage}</p>
          {/* bdi keeps "7.4 / 10" reading left-to-right without un-aligning it. */}
          <p className="mt-1 text-5xl font-extrabold tracking-tight">
            <bdi>
              {formatScore(overall)}
              <span className="text-xl font-medium text-muted"> / 10</span>
            </bdi>
          </p>
          {overall !== null && <ScoreMeter value={overall} className="mt-4" />}
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted">{t.results.responseCount}</p>
          <p className="mt-1 text-5xl font-extrabold tracking-tight">
            <bdi>{submissions.length}</bdi>
          </p>
        </div>
      </section>

      <section className="mt-6 card p-5 sm:p-6">
        <h2 className="text-lg font-bold">{t.results.sectionAverages}</h2>
        <p className="mt-1 text-sm text-muted">
          {t.results.sectionAveragesHint}
        </p>
        <div className="mt-3 divide-y divide-line">
          {SECTIONS.map((section) => (
            <ScoreRow
              key={section.key}
              primary={ar ? section.ar : section.en}
              secondary={ar ? section.en : section.ar}
              value={bySection[section.key]}
              needsAttentionLabel={t.results.needsAttention}
            />
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-6">
        <h2 className="text-lg font-bold">{t.results.itemDetails}</h2>
        {SECTIONS.map((section) => (
          <div
            key={section.key}
            className="overflow-hidden card"
          >
            <h3 className="border-b border-line bg-brand-soft px-5 py-3.5 font-bold text-brand-deep sm:px-6">
              {ar ? section.ar : section.en}
            </h3>
            <div className="divide-y divide-line px-5 sm:px-6">
              {section.items.map((item) => (
                <ScoreRow
                  key={item.key}
                  primary={ar ? item.ar : item.en}
                  secondary={ar ? item.en : item.ar}
                  value={byItem[item.key]}
                  needsAttentionLabel={t.results.needsAttention}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {notes.length > 0 && (
        <section className="mt-6 card p-5 sm:p-6">
          <h2 className="flex flex-wrap items-baseline gap-x-2 text-lg font-bold">
            {t.results.recommendations}
            <bdi className="ltr-nums text-sm font-medium text-muted">
              ({notes.length})
            </bdi>
          </h2>
          <ul className="mt-4 space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-2xl border-s-4 border-chart bg-white/55 px-4 py-3"
              >
                <p className="leading-relaxed whitespace-pre-wrap">
                  {note.recommendations}
                </p>
                <p className="mt-1.5 text-xs text-muted">
                  {note.trainee_name || t.results.anonymousTrainee}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6 overflow-hidden card">
        <h2 className="border-b border-line px-5 py-4 text-lg font-bold sm:px-6">
          {t.results.individualResponses}
        </h2>
        <p className="px-5 py-3 text-sm text-muted sm:px-6">
          {t.results.responsesHint}
        </p>
        {/* Six columns: let the table scroll instead of the page. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[50rem] text-start">
            <thead className="border-y border-line bg-white/40 text-xs font-semibold text-muted">
              <tr>
                <th className="px-5 py-3 font-medium sm:px-6">
                  {t.results.colTrainee}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t.results.colProgramName}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t.results.colProgramDate}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t.results.colInstructors}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t.results.colSubmittedAt}
                </th>
                <th className="px-5 py-3 font-medium">{t.results.colAverage}</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-5 py-3 text-sm sm:px-6">
                    {submission.trainee_name || (
                      <span className="text-muted">{t.results.noName}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-sm">
                    {submission.program_name}
                  </td>
                  <td className="px-5 py-3 text-sm whitespace-nowrap text-muted">
                    <bdi className="ltr-nums">{submission.program_date}</bdi>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted">
                    {submission.instructors.join("، ") || "—"}
                  </td>
                  <td className="px-5 py-3 text-sm whitespace-nowrap text-muted">
                    <bdi className="ltr-nums">
                      {submission.created_at.slice(0, 10)}
                    </bdi>
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold">
                    <bdi className="ltr-nums">
                      {formatScore(submissionAverage(submission.ratings))}
                    </bdi>
                  </td>
                  <td className="px-2 py-3">
                    <DeleteSubmissionButton id={submission.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
