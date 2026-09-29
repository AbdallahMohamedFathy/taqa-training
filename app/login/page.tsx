import LanguageToggle from "@/components/LanguageToggle";
import { getT } from "@/lib/i18n-server";
import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const t = await getT();
  const { next } = await searchParams;
  const redirectTo =
    typeof next === "string" && next.startsWith("/dashboard")
      ? next
      : "/dashboard";

  return (
    <>
      <div className="mx-auto flex w-full max-w-md justify-end px-4 pt-4">
        <LanguageToggle />
      </div>
      <main className="mx-auto flex w-full max-w-md flex-1 items-center px-4 pb-16">
        <div className="w-full">
          <h1 className="gradient-text text-3xl font-extrabold tracking-tight">
            {t.login.title}
          </h1>
          <p className="mt-1 text-sm text-muted">{t.login.subtitle}</p>
          <LoginForm redirectTo={redirectTo} />
        </div>
      </main>
    </>
  );
}
