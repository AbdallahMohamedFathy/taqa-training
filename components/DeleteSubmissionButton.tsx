"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import { createClient } from "@/lib/supabase/client";

/** Removes one response — for tests and mistaken submissions. */
export default function DeleteSubmissionButton({ id }: { id: string }) {
  const router = useRouter();
  const { t } = useLang();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(t.results.confirmDeleteRow)) return;

    setBusy(true);
    const { error } = await createClient()
      .from("submissions")
      .delete()
      .eq("id", id);
    setBusy(false);

    if (error) {
      alert(t.results.deleteFailed);
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="no-print rounded-lg px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-danger-soft hover:text-danger disabled:opacity-50"
    >
      {t.results.deleteRow}
    </button>
  );
}
