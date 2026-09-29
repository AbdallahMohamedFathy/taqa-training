"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import { cleanText } from "@/lib/clean-text";
import { createClient } from "@/lib/supabase/client";
import type { Program } from "@/lib/types";

export default function AttendanceForm({ programs }: { programs: Program[] }) {
  const router = useRouter();
  const { t } = useLang();

  const [programName, setProgramName] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const cleanName = cleanText(name);
    const cleanDepartment = cleanText(department);

    if (!programName || !cleanName || !cleanDepartment) {
      setError(t.attendance.errFields);
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await createClient()
      .from("attendance")
      .insert({
        program_name: programName,
        name: cleanName,
        department: cleanDepartment,
      });

    if (insertError) {
      setSubmitting(false);
      setError(t.attendance.errSubmit);
      return;
    }

    router.push("/attend/done");
  }

  // Without a course to attach the sign-in to there is nothing valid to save.
  if (programs.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-16">
        <div className="card w-full p-8 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-3xl">
            📋
          </div>
          <h1 className="mt-5 text-xl font-extrabold">
            {t.form.noProgramsTitle}
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            {t.form.noProgramsBody}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8 sm:py-12">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-brand-vivid to-chart px-6 py-7 text-white sm:px-8">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {t.attendance.formTitle}
          </h1>
          <p className="mt-1 text-sm text-white/85">
            {t.attendance.formSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          <label className="block">
            <span className="text-sm font-medium">{t.form.programName}</span>
            <select
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="field mt-2"
            >
              <option value="">{t.form.choosePlaceholder}</option>
              {programs.map((program) => (
                <option key={program.id} value={program.name}>
                  {program.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium">
              {t.attendance.yourName}
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field mt-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">
              {t.attendance.yourDepartment}
            </span>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="field mt-2"
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm font-medium text-danger"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full px-6 py-3.5"
          >
            {submitting ? t.attendance.submitting : t.attendance.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
