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
      <header className="no-print bg-brand text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-base">
              📋
            </span>
            <span className="font-bold">{t.appName}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard/settings"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white"
            >
              {t.settings}
            </Link>
            <span className="hidden text-sm text-white/70 md:inline" dir="ltr">
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
