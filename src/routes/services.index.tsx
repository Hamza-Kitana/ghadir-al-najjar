import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinemaBg } from "@/components/CinemaBg";
import { SplitLink } from "@/components/Transition";
import { categories, services } from "@/lib/services";

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
  const [cat, setCat] = useState<string>("all");
  const list = cat === "all" ? services : services.filter((s) => s.category === cat);
  return (
    <main className="relative min-h-screen px-5 pb-20 pt-28 md:px-12">
      <CinemaBg />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="rise text-sm tracking-[0.4em] text-gold-deep">OUR TREATMENTS</p>
          <h1
            className="rise font-arabic text-5xl text-gold-gradient md:text-6xl"
            style={{ animationDelay: ".15s" }}
          >
            خدماتنا
          </h1>
        </div>
        <div
          className="rise mb-10 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: ".3s" }}
        >
          {[{ id: "all", title: "الكل" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                cat === c.id
                  ? "bg-gold-gradient text-primary-foreground shadow-gold"
                  : "glass hover:text-primary"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div key={cat} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <SplitLink
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="svc-card rise block aspect-[4/5]"
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="shade absolute inset-0 -z-10" />
              <div className="flex h-full flex-col justify-end p-6 text-primary-foreground">
                <span className="font-display text-lg italic text-gold-light">{s.en}</span>
                <h2 className="font-arabic text-3xl">{s.title}</h2>
                <p className="mt-1 text-sm opacity-85">{s.short}</p>
              </div>
            </SplitLink>
          ))}
        </div>
      </div>
    </main>
  );
}
