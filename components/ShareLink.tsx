"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";

/** The single public form link HR shares with every trainee, every course. */
export default function ShareLink() {
  const { t } = useLang();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}/evaluate`);
  }, []);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="no-print mt-6 rounded-2xl border border-line bg-brand-soft p-5">
      <p className="text-sm font-medium">{t.share.title}</p>
      <p className="mt-1 text-sm text-muted">{t.share.hint}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          readOnly
          dir="ltr"
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none"
        />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          {copied ? t.share.copied : t.share.copy}
        </button>
      </div>
    </div>
  );
}
