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
  nav: { evaluations: "التقييمات", attendance: "الحضور" },
  signOut: "خروج",
  backToPrograms: "رجوع للبرامج",
  langLabel: "English",

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
    errTraineeName: "من فضلك اكتب اسمك.",
    errItems: (n: number) => `من فضلك قيّم كل البنود. باقي ${n} بند.`,
    errItemRequired: "لازم تختار درجة لهذا البند.",
    errSubmit: "حصل خطأ أثناء الإرسال. من فضلك حاول مرة تانية.",
    thankYouTitle: "تم استلام تقييمك",
    thankYouBody:
      "شكراً لتعاونك. ملاحظاتك هتساعدنا نحسّن البرامج التدريبية القادمة.",
  },

  attendance: {
    nav: "الحضور",
    title: "سجل الحضور",
    hint: "الجلسات بتتكوّن لوحدها من تسجيلات الحاضرين — كل برنامج في يوم معيّن جلسة.",
    empty: "لسه مفيش حضور مسجّل",
    emptyHint: "اعرض كود QR بتاع الحضور في آخر الجلسة، والأسماء هتظهر هنا.",
    colProgram: "البرنامج",
    colDate: "التاريخ",
    colCount: "عدد الحاضرين",
    colName: "الاسم",
    colDepartment: "القسم",
    colNo: "م",
    colSignature: "التوقيع",
    printSheet: "طباعة / حفظ PDF",
    exportExcel: "تصدير Excel",
    sheetTitle: "كشف الحضور",
    shareTitle: "لينك تسجيل الحضور",
    shareHint: "اعرض الكود ده على الشاشة آخر الجلسة، والحاضرين يصوّروه بالموبايل.",
    showQr: "عرض كود QR",
    hideQr: "إخفاء الكود",
    formTitle: "تسجيل الحضور",
    formSubtitle: "Attendance Registration",
    yourName: "الاسم",
    yourDepartment: "القسم",
    submit: "تسجيل الحضور",
    submitting: "جارِ التسجيل…",
    errFields: "من فضلك اختر الدورة واكتب اسمك وقسمك.",
    errSubmit: "حصل خطأ أثناء التسجيل. من فضلك حاول مرة تانية.",
    doneTitle: "تم تسجيل حضورك",
    doneBody: "شكراً ليك. اسمك اتسجّل في كشف الحضور.",
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
  nav: { evaluations: "Evaluations", attendance: "Attendance" },
  signOut: "Sign out",
  backToPrograms: "Back to programs",
  langLabel: "العربية",

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
    errTraineeName: "Please enter your name.",
    errItems: (n: number) =>
      `Please rate every item. ${n} ${n === 1 ? "item is" : "items are"} still missing.`,
    errItemRequired: "This item needs a rating.",
    errSubmit: "Something went wrong while submitting. Please try again.",
    thankYouTitle: "Your evaluation was received",
    thankYouBody:
      "Thank you for your cooperation. Your feedback helps us improve future training programs.",
  },

  attendance: {
    nav: "Attendance",
    title: "Attendance register",
    hint: "Sessions build themselves from sign-ins — one course on one day is one session.",
    empty: "No attendance recorded yet",
    emptyHint: "Show the attendance QR at the end of a session and names will appear here.",
    colProgram: "Program",
    colDate: "Date",
    colCount: "Attendees",
    colName: "Name",
    colDepartment: "Department",
    colNo: "No",
    colSignature: "Signature",
    printSheet: "Print / Save PDF",
    exportExcel: "Export to Excel",
    sheetTitle: "Attendance Sheet",
    shareTitle: "Attendance sign-in link",
    shareHint: "Put this code on screen at the end of a session for attendees to scan.",
    showQr: "Show QR code",
    hideQr: "Hide code",
    formTitle: "Attendance Registration",
    formSubtitle: "تسجيل الحضور",
    yourName: "Name",
    yourDepartment: "Department",
    submit: "Register attendance",
    submitting: "Registering…",
    errFields: "Please choose your course and enter your name and department.",
    errSubmit: "Something went wrong. Please try again.",
    doneTitle: "Your attendance is recorded",
    doneBody: "Thank you. Your name has been added to the attendance sheet.",
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
