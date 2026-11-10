export type GalleryKind = "video" | "photo";
export type GalleryCategory = "studio" | "results" | "video";

export type GalleryItem = {
  id: string;
  kind: GalleryKind;
  category: GalleryCategory;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  src: string;
  poster?: string;
};

export const galleryFilterIds = ["all", "video", "studio", "results"] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "v1",
    kind: "video",
    category: "video",
    title: { ar: "جلسة عناية فاخرة", en: "Signature Session" },
    subtitle: { ar: "فيديو", en: "Film" },
    src: "/gallery/videos/session-01.mp4",
    poster: "/gallery/photos/studio-01.jpg",
  },
  {
    id: "v2",
    kind: "video",
    category: "video",
    title: { ar: "لحظات من العيادة", en: "Clinic Moments" },
    subtitle: { ar: "فيديو", en: "Film" },
    src: "/gallery/videos/session-02.mp4",
    poster: "/gallery/photos/studio-04.jpg",
  },
  {
    id: "v3",
    kind: "video",
    category: "video",
    title: { ar: "تفاصيل العناية", en: "Care Details" },
    subtitle: { ar: "فيديو", en: "Film" },
    src: "/gallery/videos/session-03.mp4",
    poster: "/gallery/photos/studio-03.jpg",
  },
  {
    id: "v4",
    kind: "video",
    category: "video",
    title: { ar: "تجربة العميل", en: "Client Experience" },
    subtitle: { ar: "فيديو", en: "Film" },
    src: "/gallery/videos/session-04.mp4",
    poster: "/gallery/photos/studio-06.jpg",
  },
  {
    id: "v5",
    kind: "video",
    category: "video",
    title: { ar: "وراء الكواليس", en: "Behind the Scenes" },
    subtitle: { ar: "فيديو", en: "Film" },
    src: "/gallery/videos/session-05.mp4",
    poster: "/gallery/photos/studio-08.jpg",
  },
  {
    id: "p1",
    kind: "photo",
    category: "studio",
    title: { ar: "غدير في العيادة", en: "In Studio" },
    subtitle: { ar: "بورتريه", en: "Portrait" },
    src: "/gallery/photos/studio-01.jpg",
  },
  {
    id: "p9",
    kind: "photo",
    category: "studio",
    title: { ar: "غدير النجار", en: "Ghadeer Al Najjar" },
    subtitle: { ar: "بورتريه", en: "Portrait" },
    src: "/gallery/photos/studio-09.jpg",
  },
  {
    id: "p0",
    kind: "photo",
    category: "studio",
    title: { ar: "إطلالة العيادة", en: "Studio Glow" },
    subtitle: { ar: "بورتريه", en: "Portrait" },
    src: "/gallery/photos/promo-ghadeer.jpg",
  },
  {
    id: "p4",
    kind: "photo",
    category: "studio",
    title: { ar: "أحدث الأجهزة", en: "Advanced Devices" },
    subtitle: { ar: "العيادة", en: "Clinic" },
    src: "/gallery/photos/studio-04.jpg",
  },
  {
    id: "p5",
    kind: "photo",
    category: "studio",
    title: { ar: "لمسة احترافية", en: "Professional Touch" },
    subtitle: { ar: "العيادة", en: "Clinic" },
    src: "/gallery/photos/studio-05.jpg",
  },
  {
    id: "p3",
    kind: "photo",
    category: "studio",
    title: { ar: "You're Beautiful", en: "You're Beautiful" },
    subtitle: { ar: "أجواء", en: "Mood" },
    src: "/gallery/photos/studio-03.jpg",
  },
  {
    id: "p6",
    kind: "photo",
    category: "studio",
    title: { ar: "استقبال دافئ", en: "Warm Welcome" },
    subtitle: { ar: "العيادة", en: "Clinic" },
    src: "/gallery/photos/studio-06.jpg",
  },
  {
    id: "p7",
    kind: "photo",
    category: "studio",
    title: { ar: "جلسة استشارة", en: "Consultation" },
    subtitle: { ar: "العيادة", en: "Clinic" },
    src: "/gallery/photos/studio-07.jpg",
  },
  {
    id: "p8",
    kind: "photo",
    category: "studio",
    title: { ar: "أجواء العيادة", en: "Clinic Atmosphere" },
    subtitle: { ar: "أجواء", en: "Mood" },
    src: "/gallery/photos/studio-08.jpg",
  },
  {
    id: "r1",
    kind: "photo",
    category: "results",
    title: { ar: "نتيجة الشفاه", en: "Lips Result" },
    subtitle: { ar: "نتائج", en: "Results" },
    src: "/gallery/photos/results-lips.jpg",
  },
  {
    id: "r2",
    kind: "photo",
    category: "results",
    title: { ar: "نتيجة فروة الرأس", en: "Scalp Result" },
    subtitle: { ar: "نتائج", en: "Results" },
    src: "/gallery/photos/results-hair.jpg",
  },
];
