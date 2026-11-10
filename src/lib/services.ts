import hydra from "@/assets/hydra.jpg";
import derma from "@/assets/derma.jpg";
import peel from "@/assets/peel.jpg";
import laser from "@/assets/laser.jpg";
import facial from "@/assets/facial.jpg";
import lips from "@/assets/lips.jpg";
import gold from "@/assets/bg-gold.jpg";

export type Service = {
  slug: string;
  title: string;
  en: string;
  category: "facial" | "derma" | "peel" | "laser";
  short: string;
  benefits: string[];
  image: string;
};

export const categories = [
  { id: "facial", title: "جلسات الوجه", en: "Facials" },
  { id: "derma", title: "ديرما بن", en: "Dermapen" },
  { id: "peel", title: "التقشيرات", en: "Peels" },
  { id: "laser", title: "الليزر والشد", en: "Laser & Lifting" },
] as const;

export const services: Service[] = [
  {
    slug: "hydrafacial",
    title: "هايدرا فيشل",
    en: "HydraFacial",
    category: "facial",
    short: "تنظيف عميق للبشرة مع تغذية ونضارة فورية.",
    benefits: ["تنظيف عميق للمسام", "ترطيب وتغذية مكثفة", "نضارة وإشراقة فورية"],
    image: hydra,
  },
  {
    slug: "mini-facial",
    title: "ميني فيشل",
    en: "Mini Facial",
    category: "facial",
    short: "جلسة سريعة منعشة تعيد للبشرة حيويتها.",
    benefits: ["تنظيف لطيف", "انتعاش فوري", "مناسبة لكل أنواع البشرة"],
    image: facial,
  },
  {
    slug: "treatment-session",
    title: "الجلسة العلاجية",
    en: "Treatment Session",
    category: "facial",
    short: "جلسة مخصصة لعلاج مشاكل بشرتك بعناية.",
    benefits: ["تشخيص حالة البشرة", "علاج موجّه", "خطة متابعة"],
    image: gold,
  },
  {
    slug: "nourish-glow",
    title: "جلسات التغذية والنضارة",
    en: "Nourish & Glow",
    category: "facial",
    short: "تغذية عميقة تمنح بشرتك لمعة صحية.",
    benefits: ["فيتامينات للبشرة", "توحيد اللون", "إشراقة تدوم"],
    image: facial,
  },
  {
    slug: "dermapen",
    title: "ديرما بن",
    en: "Dermapen",
    category: "derma",
    short: "تحفيز الكولاجين لبشرة أنعم وأكثر شباباً.",
    benefits: ["تقليل آثار الحبوب", "تصغير المسام", "تجديد الخلايا"],
    image: derma,
  },
  {
    slug: "dermapen-lips",
    title: "ديرما بن للشفاه",
    en: "Lip Dermapen",
    category: "derma",
    short: "شفاه أنعم وأكثر امتلاءً ولوناً طبيعياً.",
    benefits: ["توريد الشفاه", "ترطيب عميق", "مظهر ممتلئ طبيعي"],
    image: lips,
  },
  {
    slug: "diamond-peel",
    title: "التقشير الماسي",
    en: "Diamond Peel",
    category: "peel",
    short: "إزالة الخلايا الميتة لبشرة ناعمة كالحرير.",
    benefits: ["نعومة فورية", "تفتيح البشرة", "بدون ألم"],
    image: peel,
  },
  {
    slug: "yellow-peel",
    title: "التقشير الأصفر",
    en: "Yellow Peel",
    category: "peel",
    short: "علاج التصبغات وتوحيد لون البشرة.",
    benefits: ["علاج الكلف والتصبغات", "توحيد اللون", "تجديد البشرة"],
    image: peel,
  },
  {
    slug: "peels",
    title: "التقشيرات بأنواعها",
    en: "Chemical Peels",
    category: "peel",
    short: "تقشيرات متنوعة تناسب احتياج بشرتك.",
    benefits: ["اختيار حسب نوع البشرة", "تجديد ملمس البشرة", "إشراقة واضحة"],
    image: gold,
  },
  {
    slug: "laser",
    title: "ليزر إزالة الشعر وشد البشرة",
    en: "Laser & Tightening",
    category: "laser",
    short: "نعومة تدوم مع شد وتجديد للبشرة.",
    benefits: ["إزالة الشعر بأمان", "شد البشرة", "نتائج طويلة الأمد"],
    image: laser,
  },
  {
    slug: "aqua-lift",
    title: "شد البشرة المائي",
    en: "Aqua Lifting",
    category: "laser",
    short: "شد وترطيب للبشرة بتقنية مائية لطيفة.",
    benefits: ["شد ملحوظ", "ترطيب عميق", "مظهر أكثر شباباً"],
    image: hydra,
  },
];

export const contact = {
  phone: "+962792999439",
  phoneLabel: "0792 999 439",
  whatsapp: "https://wa.me/962792999439",
  instagram: "https://www.instagram.com/ghadeer_alnajjar77/",
  tiktok: "https://www.tiktok.com/@ghadeer.alnajjar1",
  facebook: "https://www.facebook.com/yasnen.alnajjar",
};
