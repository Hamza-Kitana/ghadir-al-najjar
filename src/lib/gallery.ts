export type GalleryKind = "video" | "photo";
export type GalleryCategory = "studio" | "results" | "video";

export type GalleryItem = {
  id: string;
  kind: GalleryKind;
  category: GalleryCategory;
  title: string;
  en: string;
  src: string;
  poster?: string;
  span?: "wide" | "tall" | "normal";
};

export const galleryFilters = [
  { id: "all", title: "الكل" },
  { id: "video", title: "فيديوهات" },
  { id: "studio", title: "الاستوديو" },
  { id: "results", title: "النتائج" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "v1",
    kind: "video",
    category: "video",
    title: "جلسة عناية فاخرة",
    en: "Signature Session",
    src: "/gallery/videos/session-01.mp4",
    poster: "/gallery/photos/studio-01.jpg",
    span: "wide",
  },
  {
    id: "v2",
    kind: "video",
    category: "video",
    title: "لحظات من العيادة",
    en: "Clinic Moments",
    src: "/gallery/videos/session-02.mp4",
    poster: "/gallery/photos/studio-04.jpg",
  },
  {
    id: "v3",
    kind: "video",
    category: "video",
    title: "تفاصيل العناية",
    en: "Care Details",
    src: "/gallery/videos/session-03.mp4",
    poster: "/gallery/photos/studio-03.jpg",
  },
  {
    id: "v4",
    kind: "video",
    category: "video",
    title: "تجربة العميل",
    en: "Client Experience",
    src: "/gallery/videos/session-04.mp4",
    poster: "/gallery/photos/studio-06.jpg",
  },
  {
    id: "v5",
    kind: "video",
    category: "video",
    title: "وراء الكواليس",
    en: "Behind the Scenes",
    src: "/gallery/videos/session-05.mp4",
    poster: "/gallery/photos/studio-08.jpg",
  },
  {
    id: "p1",
    kind: "photo",
    category: "studio",
    title: "غدير في العيادة",
    en: "In Studio",
    src: "/gallery/photos/studio-01.jpg",
    span: "tall",
  },
  {
    id: "p2",
    kind: "photo",
    category: "studio",
    title: "أخصائية البشرة",
    en: "Skin Specialist",
    src: "/gallery/photos/studio-02.jpg",
  },
  {
    id: "p3",
    kind: "photo",
    category: "studio",
    title: "You're Beautiful",
    en: "Studio Glow",
    src: "/gallery/photos/studio-03.jpg",
  },
  {
    id: "p4",
    kind: "photo",
    category: "studio",
    title: "أحدث الأجهزة",
    en: "Advanced Devices",
    src: "/gallery/photos/studio-04.jpg",
    span: "tall",
  },
  {
    id: "p5",
    kind: "photo",
    category: "studio",
    title: "لمسة احترافية",
    en: "Professional Touch",
    src: "/gallery/photos/studio-05.jpg",
  },
  {
    id: "p6",
    kind: "photo",
    category: "studio",
    title: "استقبال دافئ",
    en: "Warm Welcome",
    src: "/gallery/photos/studio-06.jpg",
  },
  {
    id: "p7",
    kind: "photo",
    category: "studio",
    title: "جلسة استشارة",
    en: "Consultation",
    src: "/gallery/photos/studio-07.jpg",
  },
  {
    id: "p8",
    kind: "photo",
    category: "studio",
    title: "أجواء العيادة",
    en: "Clinic Atmosphere",
    src: "/gallery/photos/studio-08.jpg",
  },
  {
    id: "p9",
    kind: "photo",
    category: "studio",
    title: "غدير النجار",
    en: "Portrait",
    src: "/gallery/photos/studio-09.jpg",
    span: "tall",
  },
  {
    id: "r1",
    kind: "photo",
    category: "results",
    title: "نتيجة الشفاه",
    en: "Lips Result",
    src: "/gallery/photos/results-lips.jpg",
  },
  {
    id: "r2",
    kind: "photo",
    category: "results",
    title: "نتيجة فروة الرأس",
    en: "Scalp Result",
    src: "/gallery/photos/results-hair.jpg",
    span: "wide",
  },
  {
    id: "r3",
    kind: "photo",
    category: "results",
    title: "نتيجة البشرة",
    en: "Skin Result",
    src: "/gallery/photos/results-skin.jpg",
  },
];
