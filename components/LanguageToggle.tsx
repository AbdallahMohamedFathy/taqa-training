"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { LANG_COOKIE } from "@/lib/i18n";

/**
 * Stores the choice in a cookie rather than state, so the server renders the
 * right `lang`/`dir` on the very first paint instead of flipping after hydration.
 */
export default function LanguageToggle() {
  const router = useRouter();
  const { lang, t } = useLang();

  function toggle() {
    const next = lang === "ar" ? "en" : "ar";
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="no-print rounded-lg border border-line px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background"
    >
      {t.langLabel}
    </button>
  );
}
