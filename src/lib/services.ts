import hydra from "@/assets/services/hydrafacial.jpg";
import facial from "@/assets/services/mini-facial.jpg";
import treatment from "@/assets/services/treatment-session.jpg";
import nourish from "@/assets/services/nourish-glow.jpg";
import derma from "@/assets/services/dermapen.jpg";
import lips from "@/assets/services/dermapen-lips.jpg";
import peel from "@/assets/services/diamond-peel.jpg";
import yellowPeel from "@/assets/services/yellow-peel.jpg";
import peelsImg from "@/assets/services/chemical-peels.jpg";
import laser from "@/assets/services/laser.jpg";
import aqua from "@/assets/services/aqua-lift.jpg";
import type { Locale } from "@/lib/i18n";

export type Service = {
  slug: string;
  category: "facial" | "derma" | "peel" | "laser";
  title: { ar: string; en: string };
  short: { ar: string; en: string };
  benefits: { ar: string[]; en: string[] };
  image: string;
};

export const categoryIds = ["facial", "derma", "peel", "laser"] as const;

export const services: Service[] = [
  {
    slug: "hydrafacial",
    category: "facial",
    title: { ar: "هايدرا فيشل", en: "HydraFacial" },
    short: {
      ar: "تنظيف عميق للبشرة مع تغذية ونضارة فورية.",
      en: "Deep cleansing with instant nourishment and radiance.",
    },
    benefits: {
      ar: ["تنظيف عميق للمسام", "ترطيب وتغذية مكثفة", "نضارة وإشراقة فورية"],
      en: ["Deep pore cleansing", "Intense hydration", "Instant glow"],
    },
    image: hydra,
  },
  {
    slug: "mini-facial",
    category: "facial",
    title: { ar: "ميني فيشل", en: "Mini Facial" },
    short: {
      ar: "جلسة سريعة منعشة تعيد للبشرة حيويتها.",
      en: "A quick refreshing session that revives your skin.",
    },
    benefits: {
      ar: ["تنظيف لطيف", "انتعاش فوري", "مناسبة لكل أنواع البشرة"],
      en: ["Gentle cleansing", "Instant refresh", "Suitable for all skin types"],
    },
    image: facial,
  },
  {
    slug: "treatment-session",
    category: "facial",
    title: { ar: "الجلسة العلاجية", en: "Treatment Session" },
    short: {
      ar: "جلسة مخصصة لعلاج مشاكل بشرتك بعناية.",
      en: "A customized session to treat your skin concerns carefully.",
    },
    benefits: {
      ar: ["تشخيص حالة البشرة", "علاج موجّه", "خطة متابعة"],
      en: ["Skin assessment", "Targeted treatment", "Follow-up plan"],
    },
    image: treatment,
  },
  {
    slug: "nourish-glow",
    category: "facial",
    title: { ar: "جلسات التغذية والنضارة", en: "Nourish & Glow" },
    short: {
      ar: "تغذية عميقة تمنح بشرتك لمعة صحية.",
      en: "Deep nourishment that gives your skin a healthy glow.",
    },
    benefits: {
      ar: ["فيتامينات للبشرة", "توحيد اللون", "إشراقة تدوم"],
      en: ["Skin vitamins", "Even tone", "Lasting radiance"],
    },
    image: nourish,
  },
  {
    slug: "dermapen",
    category: "derma",
    title: { ar: "ديرما بن", en: "Dermapen" },
    short: {
      ar: "تحفيز الكولاجين لبشرة أنعم وأكثر شباباً.",
      en: "Collagen stimulation for smoother, younger-looking skin.",
    },
    benefits: {
      ar: ["تقليل آثار الحبوب", "تصغير المسام", "تجديد الخلايا"],
      en: ["Reduce acne marks", "Minimize pores", "Cell renewal"],
    },
    image: derma,
  },
  {
    slug: "dermapen-lips",
    category: "derma",
    title: { ar: "ديرما بن للشفاه", en: "Lip Dermapen" },
    short: {
      ar: "شفاه أنعم وأكثر امتلاءً ولوناً طبيعياً.",
      en: "Softer, fuller lips with a natural tint.",
    },
    benefits: {
      ar: ["توريد الشفاه", "ترطيب عميق", "مظهر ممتلئ طبيعي"],
      en: ["Lip tinting", "Deep hydration", "Natural plump look"],
    },
    image: lips,
  },
  {
    slug: "diamond-peel",
    category: "peel",
    title: { ar: "التقشير الماسي", en: "Diamond Peel" },
    short: {
      ar: "إزالة الخلايا الميتة لبشرة ناعمة كالحرير.",
      en: "Removes dead cells for silky-smooth skin.",
    },
    benefits: {
      ar: ["نعومة فورية", "تفتيح البشرة", "بدون ألم"],
      en: ["Instant softness", "Brighter skin", "Painless"],
    },
    image: peel,
  },
  {
    slug: "yellow-peel",
    category: "peel",
    title: { ar: "التقشير الأصفر", en: "Yellow Peel" },
    short: {
      ar: "علاج التصبغات وتوحيد لون البشرة.",
      en: "Treats pigmentation and evens skin tone.",
    },
    benefits: {
      ar: ["علاج الكلف والتصبغات", "توحيد اللون", "تجديد البشرة"],
      en: ["Melasma & pigmentation care", "Even tone", "Skin renewal"],
    },
    image: yellowPeel,
  },
  {
    slug: "peels",
    category: "peel",
    title: { ar: "التقشيرات بأنواعها", en: "Chemical Peels" },
    short: {
      ar: "تقشيرات متنوعة تناسب احتياج بشرتك.",
      en: "A range of peels tailored to your skin needs.",
    },
    benefits: {
      ar: ["اختيار حسب نوع البشرة", "تجديد ملمس البشرة", "إشراقة واضحة"],
      en: ["Matched to skin type", "Texture renewal", "Visible glow"],
    },
    image: peelsImg,
  },
  {
    slug: "laser",
    category: "laser",
    title: { ar: "ليزر إزالة الشعر وشد البشرة", en: "Laser & Tightening" },
    short: {
      ar: "نعومة تدوم مع شد وتجديد للبشرة.",
      en: "Long-lasting smoothness with skin tightening.",
    },
    benefits: {
      ar: ["إزالة الشعر بأمان", "شد البشرة", "نتائج طويلة الأمد"],
      en: ["Safe hair removal", "Skin firming", "Long-lasting results"],
    },
    image: laser,
  },
  {
    slug: "aqua-lift",
    category: "laser",
    title: { ar: "شد البشرة المائي", en: "Aqua Lifting" },
    short: {
      ar: "شد وترطيب للبشرة بتقنية مائية لطيفة.",
      en: "Gentle water-based lifting and hydration.",
    },
    benefits: {
      ar: ["شد ملحوظ", "ترطيب عميق", "مظهر أكثر شباباً"],
      en: ["Visible firming", "Deep hydration", "Youthful look"],
    },
    image: aqua,
  },
];

export const contact = {
  phone: "+962792999439",
  phoneLabel: "0792 999 439",
  whatsapp: "https://wa.me/962792999439",
  instagram: "https://www.instagram.com/ghadeer_alnajjar77/",
  tiktok: "https://www.tiktok.com/@ghadeer.alnajjar1",
  facebook: "https://www.facebook.com/yasnen.alnajjar",
  maps: "https://maps.app.goo.gl/oxUZCLjXKBnLXSCp6",
  mapsEmbed:
    "https://www.google.com/maps?q=31.9931901,35.8700961&hl=ar&z=16&output=embed",
  clinic: {
    ar: "عيادة الدكتور أنور العدوان — Derma Solutions Clinic",
    en: "Dr. Anwar Al Adwan — Derma Solutions Clinic",
  },
  address: {
    ar: "شارع المدينة المنورة، دوار الواحة، مجمع فطين البداد، تلاع العلي — عمّان",
    en: "Al Madinah Al Munawarah St, Al Waha Circle, Fateen Al Baddad Complex, Tlaa Al Ali — Amman",
  },
  lat: 31.9931901,
  lng: 35.8700961,
};

export function serviceTitle(service: Service, locale: Locale) {
  return service.title[locale];
}

export function serviceShort(service: Service, locale: Locale) {
  return service.short[locale];
}

export function serviceBenefits(service: Service, locale: Locale) {
  return service.benefits[locale];
}
