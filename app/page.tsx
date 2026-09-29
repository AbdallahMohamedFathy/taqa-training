import { redirect } from "next/navigation";

export default function Home() {
  // HR lands on the dashboard; middleware sends them to /login if signed out.
  // Trainees always arrive through their program's /evaluate/[slug] link.
  redirect("/dashboard");
}
