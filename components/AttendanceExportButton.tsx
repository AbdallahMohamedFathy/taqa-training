"use client";

import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import type { Session } from "@/lib/attendance";
import { downloadWorkbook, safeSheetName } from "@/lib/excel";

/** One worksheet per session, laid out like the paper register. */
export default function AttendanceExportButton({
  sessions,
}: {
  sessions: Session[];
}) {
  const { t } = useLang();
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      await downloadWorkbook(
        t.attendance.sheetTitle,
        sessions.map((session) => ({
          name: safeSheetName(session.date),
          columns: [
            { header: t.attendance.colNo, width: 6 },
            { header: t.attendance.colName, width: 30 },
            { header: t.attendance.colDepartment, width: 26 },
            { header: t.attendance.colProgram, width: 30 },
            { header: t.attendance.colDate, width: 14 },
            // Kept empty on purpose: it is signed by hand on the printout.
            { header: t.attendance.colSignature, width: 22 },
          ],
          rows: session.attendees.map((person, i) => [
            i + 1,
            person.name,
            person.department,
            person.program_name ?? "",
            session.date,
            "",
          ]),
        })),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={busy || sessions.length === 0}
      className="btn-ghost no-print px-5 py-2.5 text-sm disabled:opacity-50"
    >
      {busy ? t.exportBtn.busy : t.attendance.exportExcel}
    </button>
  );
}
