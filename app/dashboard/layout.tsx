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
      <header className="no-print border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/dashboard" className="font-bold">
            {t.appName}
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/dashboard/settings"
              className="text-sm font-medium text-accent hover:underline"
            >
              {t.settings}
            </Link>
            <span className="hidden text-sm text-muted sm:inline" dir="ltr">
              {user?.email}
            </span>
            <LanguageToggle />
            <SignOutButton />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
