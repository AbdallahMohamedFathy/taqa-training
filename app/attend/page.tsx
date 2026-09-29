import LanguageToggle from "@/components/LanguageToggle";
import { createClient } from "@/lib/supabase/server";
import type { Program } from "@/lib/types";
import AttendanceForm from "./AttendanceForm";

// The QR link shown at the end of a session.
export default async function AttendPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .order("name");

  if (error) throw error;

  return (
    <>
      <div className="mx-auto flex w-full max-w-lg justify-end px-4 pt-4">
        <LanguageToggle />
      </div>
      <AttendanceForm programs={(data ?? []) as Program[]} />
    </>
  );
}
