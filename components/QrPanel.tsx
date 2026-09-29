"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";

/** A shareable link plus a QR code for it, generated in the browser. */
export default function QrPanel({
  path,
  title,
  hint,
}: {
  path: string;
  title: string;
  hint: string;
}) {
  const { t } = useLang();
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  useEffect(() => {
    if (!open || !url || qr) return;
    let alive = true;
    // Loaded on demand — the QR encoder is dead weight until the code is shown.
    import("qrcode").then(async ({ default: QRCode }) => {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 640,
        margin: 1,
        color: { dark: "#1e3a6b", light: "#ffffff" },
      });
      if (alive) setQr(dataUrl);
    });
    return () => {
      alive = false;
    };
  }, [open, url, qr]);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="no-print mt-6 rounded-2xl border border-white/60 bg-brand-soft p-5 backdrop-blur-xl">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          readOnly
          dir="ltr"
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="field min-w-0 flex-1"
        />
        <button type="button" onClick={copy} className="btn-primary px-5 py-2.5 text-sm">
          {copied ? t.share.copied : t.share.copy}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost px-5 py-2.5 text-sm"
        >
          {open ? t.attendance.hideQr : t.attendance.showQr}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex justify-center">
          <div className="rounded-2xl bg-white p-4 shadow-lg">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qr}
                alt={title}
                className="h-56 w-56"
                style={{ imageRendering: "pixelated" }}
              />
            ) : (
              <div className="flex h-56 w-56 items-center justify-center text-sm text-muted">
                …
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
