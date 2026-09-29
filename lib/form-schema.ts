/**
 * The evaluation form, transcribed from the paper original.
 *
 * This is the single source of truth: the trainee form renders from it and the
 * HR dashboard averages against it. Adding or renaming an item happens here.
 */

export type RatingItem = {
  /** Key stored inside `submissions.ratings` (jsonb). Never rename in place. */
  key: string;
  en: string;
  ar: string;
};

export type Section = {
  key: string;
  en: string;
  ar: string;
  items: RatingItem[];
};

export const RATING_MIN = 1;
export const RATING_MAX = 10;

export const SECTIONS: Section[] = [
  {
    key: "course_design",
    en: "Course Design",
    ar: "الدورة التدريبية",
    items: [
      {
        key: "objectives_clear",
        en: "The objectives of the course were clearly defined and communicated.",
        ar: "أهداف الدورة التدريبية واضحة وسهلة الفهم.",
      },
      {
        key: "duration_suitable",
        en: "The duration of the course was suitable in accordance with the contents and objectives marked out.",
        ar: "مدة الدورة التدريبية ملائمة للمحتوى وأهدافها.",
      },
      {
        key: "content_covers_objectives",
        en: "The contents covered all the objectives.",
        ar: "محتوى الدورة التدريبية يغطي جميع الأهداف.",
      },
      {
        key: "content_useful_for_job",
        en: "The course content will be useful for me in my job occupation.",
        ar: "محتوى الدورة التدريبية مفيد في مجال عملي.",
      },
    ],
  },
  {
    key: "material",
    en: "Documentation / Material",
    ar: "الوثائق / المادة العلمية",
    items: [
      {
        key: "material_helped_comprehension",
        en: "The material given helped in the comprehension of the contents.",
        ar: "المادة العلمية ساعدت على فهم محتوى الدورة التدريبية.",
      },
      {
        key: "material_quality",
        en: "The material was presented properly and in good condition (quality of the photocopies, folders, etc.).",
        ar: "تم تقديم المادة العلمية بشكل صحيح وبحالة جيدة (النسخ، الصور... إلخ).",
      },
    ],
  },
  {
    key: "coordination",
    en: "Coordination",
    ar: "التنسيق",
    items: [
      {
        key: "organization_coordination",
        en: "The organization and the coordination of the course.",
        ar: "مستوى تنظيم وتنسيق الدورة التدريبية.",
      },
    ],
  },
  {
    key: "trainers",
    en: "Trainers",
    ar: "المدربين",
    items: [
      {
        key: "trainer_delivered_per_objectives",
        en: "The trainer delivered the course and its contents according to the objectives foreseen.",
        ar: "قام المدرب بتقديم الدورة التدريبية ومحتوياتها طبقاً للأهداف المتوقعة.",
      },
      {
        key: "trainer_communication",
        en: "The trainer communicated with clarity, efficiently and encouraged group participation.",
        ar: "قام المدرب بالتواصل مع المتدربين بوضوح وكفاءة وتشجيع المشاركة الجماعية.",
      },
      {
        key: "trainer_checked_understanding",
        en: "The trainer checked that his explications were understood (resolving doubts, etc.).",
        ar: "قام المدرب بالتحقق من فهم المحتوى.",
      },
      {
        key: "trainer_aids_helped",
        en: "The use of training aids (slides, videotapes, etc.) helped in understanding the subject.",
        ar: "استخدام وسائل التدريب (الشرائح، الفيديو... إلخ) ساعد على فهم المادة.",
      },
    ],
  },
  {
    key: "training_centre",
    en: "Training Centre",
    ar: "مركز التدريب",
    items: [
      {
        key: "room_adequate",
        en: "The training room was adequate for the type of course and the size of the group.",
        ar: "مكان التدريب ملائم لنوع التدريب وعدد المتدربين.",
      },
      {
        key: "room_conditions",
        en: "The conditions of the training room (temperature, light, furniture, etc.) were good.",
        ar: "حالة مكان التدريب (درجة الحرارة، الضوء، الأثاث... إلخ) جيدة.",
      },
      {
        key: "equipment_worked",
        en: "The training equipment used (computers, videos, data screens) worked properly.",
        ar: "وسائل التدريب (الحاسب الآلي، الفيديو، شاشات العرض) تعمل بشكل جيد.",
      },
      {
        key: "attention_received",
        en: "The attention received by the trainee was good when in the center.",
        ar: "تلقى المتدربون الاهتمام المناسب داخل المركز.",
      },
    ],
  },
];

export const ALL_ITEMS: RatingItem[] = SECTIONS.flatMap((s) => s.items);

export const ALL_ITEM_KEYS: string[] = ALL_ITEMS.map((i) => i.key);
