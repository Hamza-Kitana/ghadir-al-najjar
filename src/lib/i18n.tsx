import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ar" | "en";

type Dict = Record<string, string>;

const messages: Record<Locale, Dict> = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.gallery": "المعرض",
    "nav.about": "عن غدير",
    "nav.homeShort": "رئيسية",
    "nav.servicesShort": "خدمات",
    "nav.galleryShort": "معرض",
    "nav.aboutShort": "غدير",
    "nav.aria": "التنقل",
    "nav.whatsapp": "واتساب",
    "nav.whatsappFab": "تواصل واتساب",
    "nav.lang": "English",
    "nav.langAria": "Switch to English",
    "audio.mute": "كتم الصوت",
    "audio.unmute": "تشغيل الصوت",
    "audio.volume": "مستوى الصوت",

    "home.eyebrow": "SKIN SPECIALIST",
    "home.name": "غدير النجار",
    "home.tagline": "Healthy Skin, Beautiful You",
    "home.desc": "عناية فاخرة ببشرتك بأحدث التقنيات — لأن نضارتك تستحق الأفضل.",
    "home.ctaServices": "اكتشفي خدماتنا",
    "home.ctaWhatsapp": "احجزي واتساب",

    "about.eyebrow": "ABOUT ME",
    "about.name": "غدير النجار",
    "about.body":
      "أخصائية عناية بالبشرة، أؤمن أن كل بشرة لها قصتها الخاصة. أقدم جلسات الميني فيشل والجلسات العلاجية، ومنها الهايدرا فيشل لتغذية البشرة ونضارتها، وجلسات التغذية والنضارة، إلى جانب الديرما بن والتقشيرات والليزر.",
    "about.stat1": "خدمة",
    "about.stat2": "عناية",
    "about.stat3": "أجهزة",
    "about.ctaServices": "شاهدي الخدمات",
    "about.ctaWhatsapp": "تواصلي واتساب",

    "services.eyebrow": "OUR TREATMENTS",
    "services.title": "خدماتنا",
    "services.all": "الكل",
    "services.book": "احجزي عبر واتساب",
    "services.allServices": "كل الخدمات",
    "services.others": "خدمات أخرى",
    "services.whatsappMsg": "مرحبا غدير، بدي أحجز جلسة {name}",

    "gallery.eyebrow": "GALLERY",
    "gallery.title": "المعرض",
    "gallery.desc": "فيديوهات وصور من داخل العيادة، ولحظات حقيقية من جلسات العناية والنتائج.",
    "gallery.all": "الكل",
    "gallery.videos": "فيديوهات",
    "gallery.studio": "الاستوديو",
    "gallery.results": "النتائج",
    "gallery.close": "إغلاق",

    "cat.facial": "جلسات الوجه",
    "cat.derma": "ديرما بن",
    "cat.peel": "التقشيرات",
    "cat.laser": "الليزر والشد",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.homeShort": "Home",
    "nav.servicesShort": "Services",
    "nav.galleryShort": "Gallery",
    "nav.aboutShort": "About",
    "nav.aria": "Navigation",
    "nav.whatsapp": "WhatsApp",
    "nav.whatsappFab": "Chat on WhatsApp",
    "nav.lang": "عربي",
    "nav.langAria": "التبديل إلى العربية",
    "audio.mute": "Mute",
    "audio.unmute": "Unmute",
    "audio.volume": "Volume",

    "home.eyebrow": "SKIN SPECIALIST",
    "home.name": "Ghadeer Al Najjar",
    "home.tagline": "Healthy Skin, Beautiful You",
    "home.desc": "Luxury skincare with advanced techniques — because your glow deserves the best.",
    "home.ctaServices": "Explore Services",
    "home.ctaWhatsapp": "Book on WhatsApp",

    "about.eyebrow": "ABOUT ME",
    "about.name": "Ghadeer Al Najjar",
    "about.body":
      "I'm a skincare specialist who believes every skin has its own story. I offer mini facials and treatment sessions, including HydraFacial for nourishment and radiance, glow therapies, dermapen, peels, and laser care.",
    "about.stat1": "Services",
    "about.stat2": "Care",
    "about.stat3": "Devices",
    "about.ctaServices": "View Services",
    "about.ctaWhatsapp": "WhatsApp Me",

    "services.eyebrow": "OUR TREATMENTS",
    "services.title": "Our Services",
    "services.all": "All",
    "services.book": "Book on WhatsApp",
    "services.allServices": "All Services",
    "services.others": "More Services",
    "services.whatsappMsg": "Hi Ghadeer, I'd like to book a {name} session",

    "gallery.eyebrow": "GALLERY",
    "gallery.title": "Gallery",
    "gallery.desc": "Videos and photos from the clinic, real care moments and results.",
    "gallery.all": "All",
    "gallery.videos": "Videos",
    "gallery.studio": "Studio",
    "gallery.results": "Results",
    "gallery.close": "Close",

    "cat.facial": "Facials",
    "cat.derma": "Dermapen",
    "cat.peel": "Peels",
    "cat.laser": "Laser & Lifting",
  },
};

type LocaleCtx = {
  locale: Locale;
  isAr: boolean;
  dir: "rtl" | "ltr";
  t: (key: string, vars?: Record<string, string>) => string;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleCtx | null>(null);
const STORAGE_KEY = "ghadeer-locale";

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "ar" ? "rtl" : "ltr";
  root.dataset.locale = locale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") {
      setLocaleState(saved);
      applyDocumentLocale(saved);
    } else {
      applyDocumentLocale("ar");
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyDocumentLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      let value = messages[locale][key] ?? messages.ar[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(`{${k}}`, v);
        }
      }
      return value;
    },
    [locale],
  );

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      isAr: locale === "ar",
      dir: locale === "ar" ? "rtl" : "ltr",
      t,
      toggleLocale,
      setLocale,
    }),
    [locale, t, toggleLocale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function pickLocale<T>(locale: Locale, ar: T, en: T): T {
  return locale === "ar" ? ar : en;
}
