import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";
import { getT } from "@/lib/i18n-server";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

// Every dashboard route is auth-gated and per-user: this layout reads the
// session, so nothing under /dashboard may be prerendered at build time.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const t = await getT();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <header className="no-print sticky top-0 z-20 border-b border-white/40 bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-vivid to-chart text-base shadow-lg shadow-brand-vivid/30">
              📋
            </span>
            <span className="gradient-text text-xl font-extrabold">
              {t.appName}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard/attendance"
              className="rounded-xl px-3 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
            >
              {t.attendance.nav}
            </Link>
            <span className="hidden text-sm text-muted md:inline" dir="ltr">
              {user?.email}
            </span>
            <LanguageToggle onBrand />
            <SignOutButton />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
