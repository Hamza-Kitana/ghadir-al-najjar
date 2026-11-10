import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CinemaBg } from "@/components/CinemaBg";
import { galleryFilterIds, galleryItems, type GalleryItem } from "@/lib/gallery";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "المعرض | غدير النجار" },
      {
        name: "description",
        content: "فيديوهات وصور من جلسات العناية بالبشرة لدى غدير النجار.",
      },
      { property: "og:title", content: "معرض غدير النجار" },
      { property: "og:description", content: "شاهدي الفيديوهات والنتائج الحقيقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t, locale } = useLocale();
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const list =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  const featured = galleryItems.find((item) => item.kind === "video");
  const filters = galleryFilterIds.map((id) => ({
    id,
    title: t(id === "all" ? "gallery.all" : `gallery.${id === "video" ? "videos" : id}`),
  }));

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <main className="page-shell">
      <CinemaBg video="/hero-bg.mp4" image="/gallery/photos/studio-01.jpg" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <p className="rise text-sm tracking-[0.4em] text-gold-deep">{t("gallery.eyebrow")}</p>
          <h1
            className="rise font-arabic text-4xl text-gold-gradient sm:text-5xl md:text-6xl"
            style={{ animationDelay: ".15s" }}
          >
            {t("gallery.title")}
          </h1>
          <p
            className="rise mx-auto mt-3 max-w-xl px-2 text-sm text-muted-foreground sm:text-base"
            style={{ animationDelay: ".3s" }}
          >
            {t("gallery.desc")}
          </p>
        </div>

        {featured && (
          <button
            type="button"
            onClick={() => setActive(featured)}
            className="gallery-hero rise group mb-7 block w-full overflow-hidden rounded-[1.5rem] text-start sm:mb-10 sm:rounded-[2rem]"
            style={{ animationDelay: ".35s" }}
          >
            <video
              className="h-52 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[42vw] sm:max-h-[28rem] sm:min-h-56"
              src={featured.src}
              poster={featured.poster}
              muted
              loop
              autoPlay
              playsInline
            />
            <div className="gallery-hero-shade" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 sm:gap-4 sm:p-6 md:p-8">
              <div>
                <p className="font-display text-sm italic text-gold-light sm:text-lg">
                  {featured.subtitle[locale]}
                </p>
                <h2 className="font-arabic text-2xl text-primary-foreground sm:text-3xl md:text-4xl">
                  {featured.title[locale]}
                </h2>
              </div>
              <span className="gallery-play shrink-0">▶</span>
            </div>
          </button>
        )}

        <div className="chip-row rise mb-7 sm:mb-10" style={{ animationDelay: ".45s" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`chip ${filter === f.id ? "is-active" : ""}`}
            >
              {f.title}
            </button>
          ))}
        </div>

        <div key={`${filter}-${locale}`} className="gallery-grid">
          {list.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className={`gallery-card rise ${item.span === "wide" ? "is-wide" : ""} ${
                item.span === "tall" ? "is-tall" : ""
              }`}
              style={{ animationDelay: `${0.08 + i * 0.05}s` }}
            >
              {item.kind === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title[locale]}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
              <div className="gallery-card-shade" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-start text-primary-foreground sm:p-4">
                <p className="font-display text-xs italic text-gold-light sm:text-sm">
                  {item.subtitle[locale]}
                </p>
                <h3 className="font-arabic text-lg sm:text-xl">{item.title[locale]}</h3>
              </div>
              {item.kind === "video" && <span className="gallery-play gallery-play-sm">▶</span>}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="gallery-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-close"
              aria-label={t("gallery.close")}
              onClick={() => setActive(null)}
            >
              ✕
            </button>
            {active.kind === "video" ? (
              <video
                key={active.id}
                className="max-h-[70vh] w-full rounded-2xl bg-ink object-contain sm:max-h-[78vh]"
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={active.src}
                alt={active.title[locale]}
                className="max-h-[70vh] w-full rounded-2xl object-contain sm:max-h-[78vh]"
              />
            )}
            <div className="mt-3 text-center sm:mt-4">
              <p className="font-display text-base italic text-gold-deep sm:text-lg">
                {active.subtitle[locale]}
              </p>
              <h3 className="font-arabic text-2xl text-gold-gradient sm:text-3xl">
                {active.title[locale]}
              </h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
