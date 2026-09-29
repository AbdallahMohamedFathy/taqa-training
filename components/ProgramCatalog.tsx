"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import { programKey } from "@/lib/program-key";
import { createClient } from "@/lib/supabase/client";
import type { Program } from "@/lib/types";

export default function ProgramCatalog({
  programs,
  counts,
}: {
  programs: Program[];
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const { t } = useLang();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    // Catch a near-duplicate before the database's exact-match unique index does.
    if (programs.some((p) => programKey(p.name) === programKey(trimmed))) {
      setError(t.catalog.duplicate);
      return;
    }

    setBusy(true);
    setError(null);
    const { error: insertError } = await createClient()
      .from("programs")
      .insert({ name: trimmed });
    setBusy(false);

    if (insertError) {
      setError(
        insertError.code === "23505" ? t.catalog.duplicate : t.catalog.addFailed,
      );
      return;
    }

    setName("");
    router.refresh();
  }

  async function remove(program: Program) {
    if (!confirm(t.catalog.confirmRemove(program.name))) return;

    const { error: deleteError } = await createClient()
      .from("programs")
      .delete()
      .eq("id", program.id);

    if (deleteError) {
      setError(t.catalog.removeFailed);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <h1 className="gradient-text mt-3 text-3xl font-extrabold tracking-tight">
        {t.catalog.title}
      </h1>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {t.catalog.hint}
      </p>

      <form onSubmit={add} className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          placeholder={t.catalog.addPlaceholder}
          className="field min-w-0 flex-1"
        />
        <button
          type="submit"
          disabled={busy || !name.trim()}
          className="btn-primary shrink-0 px-6 py-3"
        >
          {busy ? t.catalog.adding : t.catalog.add}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      {programs.length === 0 ? (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-line bg-white/45 p-10 text-center text-sm text-muted">
          {t.catalog.empty}
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line overflow-hidden card">
          {programs.map((program) => {
            const used = counts[programKey(program.name)] ?? 0;
            return (
              <li
                key={program.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="min-w-0">
                  <p className="font-medium">{program.name}</p>
                  {used > 0 && (
                    <p className="mt-0.5 text-xs text-muted">
                      {t.catalog.usedIn(used)}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(program)}
                  className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-danger transition-colors hover:bg-danger-soft"
                >
                  {t.catalog.remove}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
