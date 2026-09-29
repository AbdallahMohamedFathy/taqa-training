"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { RATING_MAX, RATING_MIN, SECTIONS, ALL_ITEMS } from "@/lib/form-schema";
import { cleanText } from "@/lib/clean-text";
import { createClient } from "@/lib/supabase/client";
import type { Program, Ratings } from "@/lib/types";

const SCALE = Array.from(
  { length: RATING_MAX - RATING_MIN + 1 },
  (_, i) => RATING_MIN + i,
);

const headerInputClass =
  "field mt-2";

/** Saves one evaluation. Swappable so a demo can run without Supabase. */
export type SubmitHandler = (payload: {
  program_name: string;
  program_date: string;
  instructors: string[];
  trainee_name: string | null;
  ratings: Ratings;
  recommendations: string | null;
}) => Promise<{ error: unknown }>;

const saveToSupabase: SubmitHandler = async (payload) => {
  const { error } = await createClient().from("submissions").insert(payload);
  return { error };
};

export default function EvaluationForm({
  programs,
  onSubmit = saveToSupabase,
}: {
  programs: Program[];
  onSubmit?: SubmitHandler;
}) {
  const router = useRouter();
  const { lang, t } = useLang();
  const ar = lang === "ar";

  const [programName, setProgramName] = useState("");
  const [programDate, setProgramDate] = useState("");
  const [instructors, setInstructors] = useState(["", "", ""]);
  const [ratings, setRatings] = useState<Ratings>({});
  const [traineeName, setTraineeName] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState<Set<string>>(new Set());
  const [nameMissing, setNameMissing] = useState(false);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const headerRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLLabelElement | null>(null);

  const answered = ALL_ITEMS.filter((i) => ratings[i.key] !== undefined).length;

  function setRating(key: string, value: number) {
    setRatings((prev) => ({ ...prev, [key]: value }));
    setMissing((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!programName.trim() || !programDate) {
      setError(t.form.errHeader);
      headerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const unanswered = ALL_ITEMS.filter((i) => ratings[i.key] === undefined);
    if (unanswered.length > 0) {
      setMissing(new Set(unanswered.map((i) => i.key)));
      setError(t.form.errItems(unanswered.length));
      itemRefs.current[unanswered[0].key]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!cleanText(traineeName)) {
      setNameMissing(true);
      setError(t.form.errTraineeName);
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await onSubmit({
      program_name: programName.trim(),
      program_date: programDate,
      instructors: instructors.map(cleanText).filter(Boolean),
      trainee_name: cleanText(traineeName),
      ratings,
      recommendations: recommendations.trim() || null,
    });

    if (insertError) {
      setSubmitting(false);
      setError(t.form.errSubmit);
      return;
    }

    router.push("/evaluate/thank-you");
  }

  // The course must come from HR's list, so with an empty list there is
  // nothing valid to submit. Say so plainly instead of showing a dead form.
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
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header ref={headerRef} className="scroll-mt-4 card overflow-hidden">
        <div className="bg-gradient-to-br from-brand-vivid to-chart px-6 py-7 text-white sm:px-8 sm:py-8">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t.form.title}
          </h1>
          {/* The paper original is bilingual, so the other language stays on show. */}
          <p className="mt-1 text-sm text-white/85">{t.form.subtitle}</p>
        </div>

        <div className="p-6 sm:p-8">
        {/* The trainee fills the program header themselves, as on the paper form. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">{t.form.programName}</span>
            <select
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className={headerInputClass}
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
            <span className="text-sm font-medium">{t.form.programDate}</span>
            <input
              type="date"
              dir="ltr"
              value={programDate}
              onChange={(e) => setProgramDate(e.target.value)}
              className={headerInputClass}
            />
          </label>
        </div>

        <fieldset className="mt-4">
          <legend className="text-sm font-medium">
            {t.form.instructorName}{" "}
            <span className="font-normal text-muted">{t.form.optional}</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {instructors.map((value, index) => (
              <div key={index} className="relative">
                <span className="ltr-nums absolute top-1/2 start-3 -translate-y-1/2 text-sm text-muted">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setInstructors((prev) =>
                      prev.map((v, i) => (i === index ? e.target.value : v)),
                    )
                  }
                  className={`${headerInputClass} mt-2 ps-8`}
                />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 rounded-xl bg-brand-soft px-4 py-3 text-sm leading-relaxed">
          {t.form.instructions}
        </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {SECTIONS.map((section) => (
          <section
            key={section.key}
            className="overflow-hidden card"
          >
            <h2 className="flex flex-wrap items-baseline gap-x-2 border-b border-line bg-brand-soft px-5 py-3.5 text-brand-deep sm:px-6">
              <span className="text-base font-bold">
                {ar ? section.ar : section.en}
              </span>
              <bdi className="text-sm font-medium text-muted">
                {ar ? section.en : section.ar}
              </bdi>
            </h2>

            <div className="divide-y divide-line">
              {section.items.map((item) => (
                <div
                  key={item.key}
                  ref={(el) => {
                    itemRefs.current[item.key] = el;
                  }}
                  className={`px-5 py-5 sm:px-6 ${
                    missing.has(item.key) ? "bg-danger-soft" : ""
                  }`}
                >
                  <p className="font-medium leading-relaxed">
                    <bdi>{ar ? item.ar : item.en}</bdi>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    <bdi>{ar ? item.en : item.ar}</bdi>
                  </p>

                  <RatingScale
                    name={item.key}
                    value={ratings[item.key]}
                    onChange={(v) => setRating(item.key, v)}
                    lowLabel={t.form.scaleLow}
                    highLabel={t.form.scaleHigh}
                  />

                  {missing.has(item.key) && (
                    <p className="mt-2 text-sm font-medium text-danger">
                      {t.form.errItemRequired}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="card p-5 sm:p-6">
          <h2 className="text-base font-bold">{t.form.recommendations}</h2>
          <textarea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            rows={5}
            placeholder={t.form.recommendationsPlaceholder}
            className="mt-4 w-full rounded-xl border border-line bg-background px-4 py-3 leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />

          <label ref={nameRef} className="mt-5 block scroll-mt-4">
            <span className="text-sm font-medium">{t.form.traineeName}</span>
            <input
              type="text"
              value={traineeName}
              onChange={(e) => {
                setTraineeName(e.target.value);
                setNameMissing(false);
              }}
              aria-invalid={nameMissing}
              className={`field mt-2 ${nameMissing ? "border-danger" : ""}`}
            />
            {nameMissing && (
              <span className="mt-2 block text-sm font-medium text-danger">
                {t.form.errTraineeName}
              </span>
            )}
          </label>
        </section>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm font-medium text-danger"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {t.form.answered(answered, ALL_ITEMS.length)}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary px-8 py-3.5"
          >
            {submitting ? t.form.submitting : t.form.submit}
          </button>
        </div>
      </form>
    </main>
  );
}

function RatingScale({
  name,
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  name: string;
  value: number | undefined;
  onChange: (value: number) => void;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <fieldset className="mt-4">
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10" dir="ltr">
        {SCALE.map((score) => {
          const selected = value === score;
          return (
            <label
              key={score}
              className={`ltr-nums flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                selected
                  ? "border-transparent bg-gradient-to-br from-brand-vivid to-chart text-white shadow-md shadow-brand-vivid/35"
                  : "border-line bg-white/55 hover:border-brand-vivid hover:bg-white/90"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={score}
                checked={selected}
                onChange={() => onChange(score)}
                className="sr-only"
              />
              {score}
            </label>
          );
        })}
      </div>
      {/* LTR so each caption sits under the end of the scale it describes. */}
      <div dir="ltr" className="mt-1.5 flex justify-between text-xs text-muted">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </fieldset>
  );
}
