import { getT } from "@/lib/i18n-server";

export default async function ThankYouPage() {
  const t = await getT();

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-16">
      <div className="w-full card p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-3xl text-brand">
          ✓
        </div>
        <h1 className="mt-5 text-2xl font-bold">{t.form.thankYouTitle}</h1>
        <p className="mt-3 leading-relaxed text-muted">{t.form.thankYouBody}</p>
      </div>
    </main>
  );
}
