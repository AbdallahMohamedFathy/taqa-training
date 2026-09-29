import ProgramList from "@/components/ProgramList";
import { groupSubmissions } from "@/lib/program-key";
import { createClient } from "@/lib/supabase/server";
import type { Submission } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <ProgramList groups={groupSubmissions((data ?? []) as Submission[])} />
    </main>
  );
}
