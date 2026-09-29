import Link from "next/link";
import { notFound } from "next/navigation";
import ProgramResults from "@/components/ProgramResults";
import { groupSubmissions } from "@/lib/program-key";
import { getT } from "@/lib/i18n-server";
import { createClient } from "@/lib/supabase/server";
import type { Submission } from "@/lib/types";

export default async function ProgramPage({
  params,
}: PageProps<"/dashboard/programs/[key]">) {
  const { key } = await params;
  const t = await getT();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  const decoded = decodeURIComponent(key);
  const group = groupSubmissions((data ?? []) as Submission[]).find(
    (g) => g.key === decoded,
  );
  if (!group) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/dashboard"
        className="no-print text-sm text-muted hover:text-brand"
      >
        ← {t.backToPrograms}
      </Link>
      <ProgramResults group={group} />
    </main>
  );
}
