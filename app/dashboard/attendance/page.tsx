import Link from "next/link";
import AttendanceExportButton from "@/components/AttendanceExportButton";
import QrPanel from "@/components/QrPanel";
import { groupSessions } from "@/lib/attendance";
import { getT } from "@/lib/i18n-server";
import { createClient } from "@/lib/supabase/server";
import type { Attendance } from "@/lib/types";

export default async function AttendancePage() {
  const t = await getT();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const sessions = groupSessions((data ?? []) as Attendance[]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="gradient-text text-3xl font-extrabold tracking-tight">
            {t.attendance.title}
          </h1>
          <p className="mt-1 text-sm text-muted">{t.attendance.hint}</p>
        </div>
        {sessions.length > 0 && <AttendanceExportButton sessions={sessions} />}
      </div>

      <QrPanel
        path="/attend"
        title={t.attendance.shareTitle}
        hint={t.attendance.shareHint}
      />

      {sessions.length === 0 ? (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-line bg-white/45 p-10 text-center">
          <p className="font-medium">{t.attendance.empty}</p>
          <p className="mt-1 text-sm text-muted">{t.attendance.emptyHint}</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] text-start">
              <thead className="border-b border-line bg-white/40 text-xs font-semibold text-muted">
                <tr>
                  <th className="px-5 py-3 sm:px-6">
                    {t.attendance.colProgram}
                  </th>
                  <th className="px-5 py-3">{t.attendance.colDate}</th>
                  <th className="px-5 py-3">{t.attendance.colCount}</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sessions.map((session) => (
                  <tr
                    key={session.key}
                    className="transition-colors hover:bg-white/55"
                  >
                    <td className="px-5 py-4 font-semibold sm:px-6">
                      {session.programName}
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-muted">
                      <bdi className="ltr-nums">{session.date}</bdi>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <bdi className="ltr-nums">{session.attendees.length}</bdi>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/attendance/${encodeURIComponent(session.key)}`}
                        className="btn-ghost px-4 py-2 text-sm"
                      >
                        {t.attendance.printSheet}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
