import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinemaBg } from "@/components/CinemaBg";
import { SplitLink } from "@/components/Transition";
import { categoryIds, serviceShort, serviceTitle, services } from "@/lib/services";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "الخدمات | غدير النجار" },
      {
        name: "description",
        content: "هايدرا فيشل، ميني فيشل، ديرما بن، تقشير ماسي وأصفر، ليزر وشد البشرة المائي.",
      },
      { property: "og:title", content: "خدمات العناية بالبشرة | غدير النجار" },
      { property: "og:description", content: "اكتشفي جلسات البشرة الفاخرة لدى غدير النجار." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  const { t, locale } = useLocale();
  const [cat, setCat] = useState<string>("all");
  const list = cat === "all" ? services : services.filter((s) => s.category === cat);
  const filters = [
    { id: "all", title: t("services.all") },
    ...categoryIds.map((id) => ({ id, title: t(`cat.${id}`) })),
  ];

  return (
    <main className="page-shell">
      <CinemaBg />
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <p className="rise text-sm tracking-[0.4em] text-gold-deep">{t("services.eyebrow")}</p>
          <h1
            className="rise font-arabic text-4xl text-gold-gradient sm:text-5xl md:text-6xl"
            style={{ animationDelay: ".15s" }}
          >
            {t("services.title")}
          </h1>
        </div>
        <div className="chip-row rise mb-7 sm:mb-10" style={{ animationDelay: ".3s" }}>
          {filters.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`chip ${cat === c.id ? "is-active" : ""}`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div
          key={`${cat}-${locale}`}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {list.map((s) => (
            <SplitLink
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="svc-card rise block aspect-[5/6] sm:aspect-[4/5]"
            >
              <img
                src={s.image}
                alt={serviceTitle(s, locale)}
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="shade absolute inset-0 -z-10" />
              <div className="flex h-full flex-col justify-end p-5 text-primary-foreground sm:p-6">
                <span className="font-display text-base italic text-gold-light sm:text-lg">
                  {s.title.en}
                </span>
                <h2 className="font-arabic text-2xl sm:text-3xl">{serviceTitle(s, locale)}</h2>
                <p className="mt-1 text-sm opacity-85">{serviceShort(s, locale)}</p>
              </div>
            </SplitLink>
          ))}
        </div>
      </div>
    </main>
  );
}
