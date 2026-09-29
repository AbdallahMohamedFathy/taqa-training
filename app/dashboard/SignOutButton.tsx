"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const { t } = useLang();
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background"
    >
      {t.signOut}
    </button>
  );
}
