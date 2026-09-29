import Link from "next/link";
import { notFound } from "next/navigation";
import AttendanceSheet from "@/components/AttendanceSheet";
import AttendeeList from "@/components/AttendeeList";
import PrintButton from "@/components/PrintButton";
import { groupSessions } from "@/lib/attendance";
import { getT } from "@/lib/i18n-server";
import { createClient } from "@/lib/supabase/server";
import type { Attendance } from "@/lib/types";

export default async function AttendanceSheetPage({
  params,
}: PageProps<"/dashboard/attendance/[key]">) {
  const { key } = await params;
  const t = await getT();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const session = groupSessions((data ?? []) as Attendance[]).find(
    (s) => s.key === decodeURIComponent(key),
  );
  if (!session) notFound();

  return (
    <main className="w-full px-4 py-8 sm:px-6">
      <div className="no-print mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard/attendance"
          className="text-sm text-muted hover:text-brand"
        >
          ← {t.attendance.title}
        </Link>
        <PrintButton label={t.attendance.printSheet} />
      </div>

      <AttendeeList session={session} />

      <div className="mt-6 overflow-x-auto">
        <AttendanceSheet session={session} t={t} />
      </div>
    </main>
  );
}
