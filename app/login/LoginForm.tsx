"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/components/LangProvider";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const { t } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setSubmitting(false);
      setError(t.login.failed);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 card p-6"
    >
      <label className="block">
        <span className="text-sm font-medium">{t.login.email}</span>
        <input
          type="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">{t.login.password}</span>
        <input
          type="password"
          required
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        {submitting ? t.login.submitting : t.login.submit}
      </button>
    </form>
  );
}
