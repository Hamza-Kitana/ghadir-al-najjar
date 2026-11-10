import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CinemaBg } from "@/components/CinemaBg";
import { galleryFilters, galleryItems, type GalleryItem } from "@/lib/gallery";

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
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const list =
    filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter);

  const featured = galleryItems.find((item) => item.kind === "video");

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
    <main className="relative min-h-screen px-5 pb-24 pt-28 md:px-12">
      <CinemaBg video="/hero-bg.mp4" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="rise text-sm tracking-[0.4em] text-gold-deep">GALLERY</p>
          <h1
            className="rise font-arabic text-5xl text-gold-gradient md:text-6xl"
            style={{ animationDelay: ".15s" }}
          >
            المعرض
          </h1>
          <p
            className="rise mx-auto mt-3 max-w-xl text-muted-foreground"
            style={{ animationDelay: ".3s" }}
          >
            فيديوهات وصور من داخل العيادة، ولحظات حقيقية من جلسات العناية والنتائج.
          </p>
        </div>

        {featured && (
          <button
            type="button"
            onClick={() => setActive(featured)}
            className="gallery-hero rise group mb-10 block w-full overflow-hidden rounded-[2rem] text-right"
            style={{ animationDelay: ".35s" }}
          >
            <video
              className="h-[42vw] max-h-[28rem] min-h-56 w-full object-cover transition duration-700 group-hover:scale-105"
              src={featured.src}
              poster={featured.poster}
              muted
              loop
              autoPlay
              playsInline
            />
            <div className="gallery-hero-shade" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <p className="font-display text-lg italic text-gold-light">{featured.en}</p>
                <h2 className="font-arabic text-3xl text-primary-foreground md:text-4xl">
                  {featured.title}
                </h2>
              </div>
              <span className="gallery-play shrink-0">▶</span>
            </div>
          </button>
        )}

        <div
          className="rise mb-10 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: ".45s" }}
        >
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                filter === f.id
                  ? "bg-gold-gradient text-primary-foreground shadow-gold"
                  : "glass hover:text-primary"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>

        <div key={filter} className="gallery-grid">
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
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
              <div className="gallery-card-shade" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-right text-primary-foreground">
                <p className="font-display text-sm italic text-gold-light">{item.en}</p>
                <h3 className="font-arabic text-xl">{item.title}</h3>
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
              aria-label="إغلاق"
              onClick={() => setActive(null)}
            >
              ✕
            </button>
            {active.kind === "video" ? (
              <video
                key={active.id}
                className="max-h-[78vh] w-full rounded-2xl bg-ink object-contain"
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={active.src}
                alt={active.title}
                className="max-h-[78vh] w-full rounded-2xl object-contain"
              />
            )}
            <div className="mt-4 text-center">
              <p className="font-display text-lg italic text-gold-deep">{active.en}</p>
              <h3 className="font-arabic text-3xl text-gold-gradient">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
