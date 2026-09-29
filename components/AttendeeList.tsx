"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import type { Session } from "@/lib/attendance";
import { createClient } from "@/lib/supabase/client";

/**
 * Screen-only companion to the printed sheet: lets HR drop a duplicate or a
 * test sign-in before printing. Hidden from the printout via `no-print`.
 */
export default function AttendeeList({ session }: { session: Session }) {
  const router = useRouter();
  const { t } = useLang();
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string, name: string) {
    if (!confirm(`${t.results.confirmDeleteRow}\n\n${name}`)) return;

    setBusy(id);
    const { error } = await createClient()
      .from("attendance")
      .delete()
      .eq("id", id);
    setBusy(null);

    if (error) {
      alert(t.results.deleteFailed);
      return;
    }
    router.refresh();
  }

  return (
    <div className="no-print mx-auto mt-6 w-full max-w-5xl">
      <div className="card overflow-hidden">
        <h2 className="border-b border-line px-5 py-3.5 font-bold sm:px-6">
          {t.attendance.colName}
          <bdi className="ltr-nums ms-2 text-sm font-medium text-muted">
            ({session.attendees.length})
          </bdi>
        </h2>
        <ul className="divide-y divide-line">
          {session.attendees.map((person, i) => (
            <li
              key={person.id}
              className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6"
            >
              <div className="flex min-w-0 items-baseline gap-3">
                <bdi className="ltr-nums w-6 shrink-0 text-sm text-muted">
                  {i + 1}
                </bdi>
                <div className="min-w-0">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-xs text-muted">{person.department}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(person.id, person.name)}
                disabled={busy === person.id}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-danger-soft hover:text-danger disabled:opacity-50"
              >
                {t.results.deleteRow}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
