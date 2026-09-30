"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/LangProvider";

/**
 * The two halves of the dashboard. A tab stays lit for its whole section, so
 * one course's results still reads as "Evaluations" and a printed sheet still
 * reads as "Attendance".
 */
export default function DashboardNav() {
  const pathname = usePathname();
  const { t } = useLang();

  const onAttendance = pathname.startsWith("/dashboard/attendance");

  const tabs = [
    { href: "/dashboard", label: t.nav.evaluations, active: !onAttendance },
    {
      href: "/dashboard/attendance",
      label: t.nav.attendance,
      active: onAttendance,
    },
  ];

  return (
    <nav className="flex items-center gap-1 rounded-2xl bg-white/50 p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          className={`rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-colors sm:px-4 ${
            tab.active
              ? "bg-gradient-to-br from-brand-vivid to-chart text-white shadow-md shadow-brand-vivid/30"
              : "text-brand hover:bg-brand-soft"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
