import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const list = useMemo(
    () =>
      filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  const videos = useMemo(() => list.filter((item) => item.kind === "video"), [list]);
  const studio = useMemo(
    () => list.filter((item) => item.kind === "photo" && item.category === "studio"),
    [list],
  );
  const results = useMemo(
    () => list.filter((item) => item.kind === "photo" && item.category === "results"),
    [list],
  );
  const active = activeIndex === null ? null : list[activeIndex] ?? null;

  const filters = galleryFilterIds.map((id) => ({
    id,
    title: t(id === "all" ? "gallery.all" : `gallery.${id === "video" ? "videos" : id}`),
  }));

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % list.length));
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i - 1 + list.length) % list.length));
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, list.length]);

  const openItem = (item: GalleryItem) => {
    const idx = list.findIndex((x) => x.id === item.id);
    if (idx >= 0) setActiveIndex(idx);
  };

  return (
    <main className="page-shell gallery-page">
      <CinemaBg />
      <div className="mx-auto max-w-7xl">
        <header className="gallery-head rise">
          <p className="text-sm tracking-[0.35em] text-gold-deep">{t("gallery.eyebrow")}</p>
          <h1 className="font-arabic text-4xl text-gold-gradient sm:text-5xl md:text-6xl">
            {t("gallery.title")}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            {t("gallery.desc")}
          </p>
        </header>

        <div className="chip-row rise mb-8 sm:mb-10" style={{ animationDelay: ".15s" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFilter(f.id);
                setActiveIndex(null);
              }}
              className={`chip ${filter === f.id ? "is-active" : ""}`}
            >
              {f.title}
            </button>
          ))}
        </div>

        {videos.length > 0 && (
          <GalleryBlock
            label={t("gallery.videos")}
            count={videos.length}
            delay=".25s"
          >
            <div className="gallery-reel">
              {videos.map((item) => (
                <FilmCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  onOpen={() => openItem(item)}
                />
              ))}
            </div>
          </GalleryBlock>
        )}

        {studio.length > 0 && (
          <GalleryBlock
            label={t("gallery.studio")}
            count={studio.length}
            delay=".35s"
          >
            <PhotoMosaic items={studio} locale={locale} onOpen={openItem} />
          </GalleryBlock>
        )}

        {results.length > 0 && (
          <GalleryBlock
            label={t("gallery.results")}
            count={results.length}
            delay=".45s"
          >
            <div className="gallery-results">
              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="gallery-result"
                  onClick={() => openItem(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title[locale]}
                    loading="lazy"
                    className="gallery-result-media"
                  />
                  <div className="gallery-result-overlay" />
                  <div className="gallery-result-meta">
                    <p>{item.subtitle[locale]}</p>
                    <h3>{item.title[locale]}</h3>
                  </div>
                </button>
              ))}
            </div>
          </GalleryBlock>
        )}
      </div>

      {active && activeIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div className="gallery-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-close"
              aria-label={t("gallery.close")}
              onClick={() => setActiveIndex(null)}
            >
              ✕
            </button>
            {list.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-nav gallery-nav-prev"
                  aria-label="Previous"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null ? i : (i - 1 + list.length) % list.length,
                    )
                  }
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="gallery-nav gallery-nav-next"
                  aria-label="Next"
                  onClick={() =>
                    setActiveIndex((i) => (i === null ? i : (i + 1) % list.length))
                  }
                >
                  ›
                </button>
              </>
            )}
            {active.kind === "video" ? (
              <video
                key={active.id}
                className="gallery-lightbox-media"
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
                className="gallery-lightbox-media"
              />
            )}
            <div className="gallery-lightbox-caption">
              <p>{active.subtitle[locale]}</p>
              <h3>{active.title[locale]}</h3>
              <span>
                {activeIndex + 1} / {list.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function GalleryBlock({
  label,
  count,
  delay,
  children,
}: {
  label: string;
  count: number;
  delay: string;
  children: ReactNode;
}) {
  return (
    <section className="gallery-section rise" style={{ animationDelay: delay }}>
      <div className="gallery-section-label">
        <span>{label}</span>
        <span className="gallery-count">{count}</span>
      </div>
      {children}
    </section>
  );
}

function FilmCard({
  item,
  locale,
  onOpen,
}: {
  item: GalleryItem;
  locale: "ar" | "en";
  onOpen: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <button
      type="button"
      className="gallery-film"
      onClick={onOpen}
      onMouseEnter={() => {
        const v = ref.current;
        if (!v) return;
        v.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const v = ref.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      }}
    >
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="gallery-film-media"
      />
      <div className="gallery-film-overlay" />
      <span className="gallery-film-play" aria-hidden>
        ▶
      </span>
      <div className="gallery-film-meta">
        <p>{item.subtitle[locale]}</p>
        <h3>{item.title[locale]}</h3>
      </div>
    </button>
  );
}

function PhotoMosaic({
  items,
  locale,
  onOpen,
}: {
  items: GalleryItem[];
  locale: "ar" | "en";
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <div className="gallery-mosaic">
      {items.map((item, i) => (
        <button
          key={item.id}
          type="button"
          className={`gallery-shot ${i === 0 ? "is-feature" : ""}`}
          onClick={() => onOpen(item)}
        >
          <img
            src={item.src}
            alt={item.title[locale]}
            loading="lazy"
            className="gallery-shot-media"
          />
          <div className="gallery-shot-overlay" />
          <div className="gallery-shot-meta">
            <p>{item.subtitle[locale]}</p>
            <h3>{item.title[locale]}</h3>
          </div>
        </button>
      ))}
    </div>
  );
}
