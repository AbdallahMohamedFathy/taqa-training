export type Lang = "ar" | "en";

export const DEFAULT_LANG: Lang = "ar";
export const LANG_COOKIE = "lang";

export function isLang(value: unknown): value is Lang {
  return value === "ar" || value === "en";
}

export function dirOf(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

const ar = {
  appName: "لوحة تحكم التدريب",
  signOut: "خروج",
  backToPrograms: "رجوع للبرامج",
  langLabel: "English",
  settings: "أسماء البرامج",

  login: {
    title: "لوحة تحكم التدريب",
    subtitle: "تسجيل الدخول لموظفي الموارد البشرية",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "تسجيل الدخول",
    submitting: "جارِ الدخول…",
    failed: "الإيميل أو كلمة المرور غير صحيحة.",
  },

  share: {
    title: "لينك التقييم للمتدربين",
    hint: "لينك واحد لكل الدورات — ابعته لأي متدرب بعد ما يخلّص دورته.",
    copy: "نسخ اللينك",
    copied: "تم النسخ ✓",
  },

  exportBtn: { idle: "تصدير Excel", busy: "جارِ التجهيز…" },

  list: {
    title: "البرامج التدريبية",
    hint: "الدورات بتظهر هنا لوحدها من ردود المتدربين — مفيش حاجة تتعمل قبل الدورة.",
    emptyTitle: "لسه مفيش ردود",
    emptyHint:
      "ابعت اللينك اللي فوق للمتدربين، والدورات هتظهر هنا أول ما يبدأوا يملأوا التقييم.",
    colProgram: "البرنامج",
    colDate: "التاريخ",
    colResponses: "الردود",
    colAverage: "المتوسط",
  },

  results: {
    overallAverage: "المتوسط العام",
    responseCount: "عدد الردود",
    sectionAverages: "متوسط كل محور",
    sectionAveragesHint: "متوسط درجات المحاور الخمسة من 10.",
    itemDetails: "تفاصيل البنود",
    recommendations: "توصيات للتحسين",
    individualResponses: "الردود الفردية",
    responsesHint:
      "بيانات البرنامج زي ما كتبها كل متدرب — لو فيها اختلاف يبقى فيه حد فتح لينك دورة تانية بالغلط.",
    spellingNotice: (n: number) =>
      `المتدربون كتبوا اسم الدورة بـ ${n} صيغ مختلفة، وتم تجميعهم كدورة واحدة. الصيغ كلها في الجدول تحت.`,
    needsAttention: "يحتاج تحسين",
    colTrainee: "المتدرب",
    colProgramName: "اسم البرنامج",
    colProgramDate: "تاريخ البرنامج",
    colInstructors: "المدربون",
    colSubmittedAt: "تاريخ الإرسال",
    colAverage: "المتوسط",
    noName: "بدون اسم",
    anonymousTrainee: "متدرب بدون اسم",
    deleteRow: "حذف",
    confirmDeleteRow: "تحذف الرد ده؟ مش هينفع ترجّعه.",
    deleteFailed: "حصل خطأ أثناء الحذف.",
  },

  form: {
    title: "نموذج تقييم برنامج التدريب",
    subtitle: "Training Program Evaluation Form",
    programName: "اسم البرنامج",
    choosePlaceholder: "— اختر الدورة —",
    otherOption: "أخرى (اكتبها بنفسك)",
    otherPlaceholder: "اكتب اسم الدورة",
    noProgramsYet:
      "الموارد البشرية لسه ما ضافتش أسماء الدورات. اكتب اسم دورتك بنفسك.",
    programDate: "تاريخ البرنامج",
    instructorName: "اسم المدرب",
    optional: "(اختياري)",
    instructions:
      "من فضلك اختر درجة موافقتك على كل بند من 1 إلى 10 — 1 غير راضٍ تماماً، 10 راضٍ تماماً.",
    scaleLow: "غير راضٍ تماماً",
    scaleHigh: "راضٍ تماماً",
    recommendations: "توصيات للتحسين",
    recommendationsPlaceholder:
      "اختياري — أي ملاحظات أو اقتراحات تساعدنا نحسّن البرنامج.",
    traineeName: "اسم المتدرب",
    submit: "إرسال التقييم",
    submitting: "جارِ الإرسال…",
    answered: (n: number, total: number) => `تم الرد على ${n} من ${total} بند`,
    errHeader: "من فضلك اكتب اسم البرنامج وتاريخه.",
    errItems: (n: number) => `من فضلك قيّم كل البنود. باقي ${n} بند.`,
    errItemRequired: "لازم تختار درجة لهذا البند.",
    errSubmit: "حصل خطأ أثناء الإرسال. من فضلك حاول مرة تانية.",
    thankYouTitle: "تم استلام تقييمك",
    thankYouBody:
      "شكراً لتعاونك. ملاحظاتك هتساعدنا نحسّن البرامج التدريبية القادمة.",
  },

  catalog: {
    title: "أسماء البرامج",
    hint: "الأسماء دي هي اللي بتظهر للمتدرب في قائمة اختيار اسم البرنامج. ضيف الدورة هنا قبل ما تبعت اللينك.",
    addPlaceholder: "اسم الدورة، مثلاً: السلامة المهنية في مواقع العمل",
    add: "إضافة",
    adding: "جارِ الإضافة…",
    remove: "حذف",
    empty: "لسه مفيش أسماء برامج. ضيف أول واحد عشان المتدربين يقدروا يختاروا.",
    duplicate: "الاسم ده موجود بالفعل.",
    addFailed: "حصل خطأ أثناء الإضافة.",
    removeFailed: "حصل خطأ أثناء الحذف.",
    confirmRemove: (name: string) =>
      `تحذف "${name}" من القائمة؟ الردود القديمة مش هتتأثر.`,
    usedIn: (n: number) => `${n} رد`,
  },

  excel: {
    lang: "ar" as Lang,
    summarySheet: "ملخص الدورات",
    allResponsesSheet: "كل الردود",
    workbookName: "تقييمات البرامج التدريبية",
    program: "البرنامج",
    fromDate: "من تاريخ",
    toDate: "إلى تاريخ",
    instructors: "المدربون",
    responseCount: "عدد الردود",
    overallAverage: "المتوسط العام",
    traineeName: "اسم المتدرب",
    programDate: "تاريخ البرنامج",
    submittedAt: "تاريخ الإرسال",
    average: "المتوسط",
    recommendations: "التوصيات",
  },
};

const en: typeof ar = {
  appName: "Training Dashboard",
  signOut: "Sign out",
  backToPrograms: "Back to programs",
  langLabel: "العربية",
  settings: "Program names",

  login: {
    title: "Training Dashboard",
    subtitle: "Sign in for HR staff",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in…",
    failed: "Incorrect email or password.",
  },

  share: {
    title: "Trainee evaluation link",
    hint: "One link for every course — send it to any trainee once they finish.",
    copy: "Copy link",
    copied: "Copied ✓",
  },

  exportBtn: { idle: "Export to Excel", busy: "Preparing…" },

  list: {
    title: "Training Programs",
    hint: "Courses appear here on their own from trainee responses — nothing to set up beforehand.",
    emptyTitle: "No responses yet",
    emptyHint:
      "Send the link above to your trainees, and courses will appear here as the evaluations come in.",
    colProgram: "Program",
    colDate: "Date",
    colResponses: "Responses",
    colAverage: "Average",
  },

  results: {
    overallAverage: "Overall average",
    responseCount: "Responses",
    sectionAverages: "Average by section",
    sectionAveragesHint: "Average score across the five sections, out of 10.",
    itemDetails: "Item breakdown",
    recommendations: "Recommendations for improvement",
    individualResponses: "Individual responses",
    responsesHint:
      "The program header as each trainee typed it — a mismatch means someone filled in the wrong course.",
    spellingNotice: (n: number) =>
      `Trainees typed this course name ${n} different ways; the responses were grouped as one course. Every spelling is in the table below.`,
    needsAttention: "Needs attention",
    colTrainee: "Trainee",
    colProgramName: "Program name",
    colProgramDate: "Program date",
    colInstructors: "Instructors",
    colSubmittedAt: "Submitted",
    colAverage: "Average",
    noName: "No name",
    anonymousTrainee: "Anonymous trainee",
    deleteRow: "Delete",
    confirmDeleteRow: "Delete this response? This cannot be undone.",
    deleteFailed: "Something went wrong while deleting.",
  },

  form: {
    title: "Training Program Evaluation Form",
    subtitle: "نموذج تقييم برنامج التدريب",
    programName: "Program Name",
    choosePlaceholder: "— Choose your course —",
    otherOption: "Other (type it in)",
    otherPlaceholder: "Type the course name",
    noProgramsYet:
      "HR has not added any course names yet. Please type your course name.",
    programDate: "Program Date",
    instructorName: "Instructor Name",
    optional: "(optional)",
    instructions:
      "Please rate your level of agreement with each statement from 1 to 10 — 1 total disagreement, 10 total agreement.",
    scaleLow: "Total disagreement",
    scaleHigh: "Total agreement",
    recommendations: "Recommendations for Improvement",
    recommendationsPlaceholder:
      "Optional — any notes or suggestions that would help us improve the program.",
    traineeName: "Trainee name",
    submit: "Submit evaluation",
    submitting: "Submitting…",
    answered: (n: number, total: number) => `${n} of ${total} items answered`,
    errHeader: "Please fill in the program name and date.",
    errItems: (n: number) =>
      `Please rate every item. ${n} ${n === 1 ? "item is" : "items are"} still missing.`,
    errItemRequired: "This item needs a rating.",
    errSubmit: "Something went wrong while submitting. Please try again.",
    thankYouTitle: "Your evaluation was received",
    thankYouBody:
      "Thank you for your cooperation. Your feedback helps us improve future training programs.",
  },

  catalog: {
    title: "Program names",
    hint: "These are the names trainees choose from when filling the form. Add the course here before sharing the link.",
    addPlaceholder: "Course name, e.g. Occupational Safety on Work Sites",
    add: "Add",
    adding: "Adding…",
    remove: "Remove",
    empty: "No program names yet. Add the first one so trainees have something to pick.",
    duplicate: "That name is already in the list.",
    addFailed: "Something went wrong while adding.",
    removeFailed: "Something went wrong while removing.",
    confirmRemove: (name: string) =>
      `Remove "${name}" from the list? Existing responses are not affected.`,
    usedIn: (n: number) => `${n} responses`,
  },

  excel: {
    lang: "en" as Lang,
    summarySheet: "Course summary",
    allResponsesSheet: "All responses",
    workbookName: "Training Program Evaluations",
    program: "Program",
    fromDate: "From date",
    toDate: "To date",
    instructors: "Instructors",
    responseCount: "Responses",
    overallAverage: "Overall average",
    traineeName: "Trainee name",
    programDate: "Program date",
    submittedAt: "Submitted",
    average: "Average",
    recommendations: "Recommendations",
  },
};

export type Dict = typeof ar;

export function getDict(lang: Lang): Dict {
  return lang === "en" ? en : ar;
}
