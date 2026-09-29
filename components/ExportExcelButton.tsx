"use client";

import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import {
  downloadWorkbook,
  responsesSheet,
  safeSheetName,
  summarySheet,
} from "@/lib/excel";
import type { ProgramGroup } from "@/lib/program-key";

type Props =
  /** All courses: a summary sheet plus every response in a second sheet. */
  | { groups: ProgramGroup[]; group?: never }
  /** One course: just its responses. */
  | { group: ProgramGroup; groups?: never };

export default function ExportExcelButton(props: Props) {
  const { t } = useLang();
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      if (props.group) {
        await downloadWorkbook(`${props.group.name} - ${props.group.firstDate}`, [
          responsesSheet(t, safeSheetName(props.group.name), props.group.submissions),
        ]);
      } else {
        const all = props.groups.flatMap((g) => g.submissions);
        await downloadWorkbook(t.excel.workbookName, [
          summarySheet(t, props.groups),
          responsesSheet(t, t.excel.allResponsesSheet, all, true),
        ]);
      }
    } finally {
      setBusy(false);
    }
  }

  const disabled = busy || (props.groups?.length === 0);

  return (
    <button
      type="button"
      onClick={download}
      disabled={disabled}
      className="no-print shrink-0 rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-background disabled:opacity-50"
    >
      {busy ? t.exportBtn.busy : t.exportBtn.idle}
    </button>
  );
}
