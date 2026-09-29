"use client";

/** Opens the browser print dialog, where "Save as PDF" is the PDF export. */
export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-primary no-print px-6 py-2.5 text-sm"
    >
      {label}
    </button>
  );
}
