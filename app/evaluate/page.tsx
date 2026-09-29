import LanguageToggle from "@/components/LanguageToggle";
import { createClient } from "@/lib/supabase/server";
import type { Program } from "@/lib/types";
import EvaluationForm from "./EvaluationForm";

// The one public link HR shares. The course list comes from HR's catalog; the
// rest of the header the trainee still fills in themselves.
export default async function EvaluatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .order("name");

  // Swallowing this once cost a whole debugging session: a misconfigured
  // Supabase URL in production failed the query, and the empty result was
  // indistinguishable from "HR has not added any courses".
  if (error) throw error;

  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl justify-end px-4 pt-4 sm:px-6">
        <LanguageToggle />
      </div>
      <EvaluationForm programs={(data ?? []) as Program[]} />
    </>
  );
}
