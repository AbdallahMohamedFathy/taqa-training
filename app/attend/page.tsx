import LanguageToggle from "@/components/LanguageToggle";
import AttendanceForm from "./AttendanceForm";

// The attendance QR points here. Attendees type their own program name, so
// there is nothing to look up before the page renders.
export default function AttendPage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-lg justify-end px-4 pt-4">
        <LanguageToggle />
      </div>
      <AttendanceForm />
    </>
  );
}
