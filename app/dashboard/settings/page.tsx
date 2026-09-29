import Link from "next/link";
import ProgramCatalog from "@/components/ProgramCatalog";
import { getT } from "@/lib/i18n-server";
import { programKey } from "@/lib/program-key";
import { createClient } from "@/lib/supabase/server";
import type { Program, Submission } from "@/lib/types";

export default async function SettingsPage() {
  const t = await getT();
  const supabase = await createClient();

  const [programsResult, submissionsResult] = await Promise.all([
    supabase.from("programs").select("*").order("name"),
    supabase.from("submissions").select("program_name"),
  ]);

  if (programsResult.error) throw programsResult.error;
  if (submissionsResult.error) throw submissionsResult.error;

  // How many responses already reference each name, so HR can see what a
  // removal would orphan before they click.
  const counts = new Map<string, number>();
  for (const s of (submissionsResult.data ?? []) as Submission[]) {
    const key = programKey(s.program_name);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const programs = (programsResult.data ?? []) as Program[];

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/dashboard"
        className="text-sm text-muted hover:text-accent no-print"
      >
        ← {t.backToPrograms}
      </Link>
      <ProgramCatalog
        programs={programs}
        counts={Object.fromEntries(counts)}
      />
    </main>
  );
}
