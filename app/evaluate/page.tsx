import LanguageToggle from "@/components/LanguageToggle";
import EvaluationForm from "./EvaluationForm";

// The one public link HR shares. Trainees fill the whole header themselves,
// exactly as on the paper form.
export default function EvaluatePage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl justify-end px-4 pt-4 sm:px-6">
        <LanguageToggle />
      </div>
      <EvaluationForm />
    </>
  );
}
