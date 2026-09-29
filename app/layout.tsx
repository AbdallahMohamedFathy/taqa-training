import type { Metadata } from "next";
import { LangProvider } from "@/components/LangProvider";
import { dirOf } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import "./globals.css";

export const metadata: Metadata = {
  title: "تقييم البرامج التدريبية | Training Program Evaluation",
  description: "نموذج تقييم برنامج التدريب — Training Program Evaluation",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();

  return (
    <html lang={lang} dir={dirOf(lang)} className="h-full antialiased">
      <body className="font-sans min-h-full flex flex-col">
        <LangProvider lang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
