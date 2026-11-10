import { createFileRoute, notFound } from "@tanstack/react-router";
import { CinemaBg } from "@/components/CinemaBg";
import { Socials } from "@/components/Chrome";
import { SplitLink } from "@/components/Transition";
import { contact, services } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | غدير النجار` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: `${loaderData.title} | غدير النجار` },
          { property: "og:description", content: loaderData.short },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "غير متوفر" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const s = Route.useLoaderData();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <main className="relative min-h-screen px-5 pb-16 pt-28 md:px-12">
      <CinemaBg image={s.image} />
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="rise relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gold-gradient opacity-60 blur-lg" />
          <img
            src={s.image}
            alt={s.title}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-gold"
          />
        </div>
        <div className="glass space-y-5 rounded-[2rem] p-8">
          <p className="rise font-display text-xl italic text-gold-deep">{s.en}</p>
          <h1 className="reveal font-arabic text-5xl text-gold-gradient">{s.title}</h1>
          <p className="rise text-lg" style={{ animationDelay: ".3s" }}>
            {s.short}
          </p>
          <ul className="space-y-3">
            {s.benefits.map((b, i) => (
              <li
                key={b}
                className="rise flex items-center gap-3"
                style={{ animationDelay: `${0.45 + i * 0.12}s` }}
              >
                <span className="h-2 w-2 rounded-full bg-primary shadow-gold" />
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`${contact.whatsapp}?text=${encodeURIComponent(`مرحبا غدير، بدي أحجز جلسة ${s.title}`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-gold-gradient shadow-gold rounded-full px-7 py-3 text-primary-foreground transition hover:scale-105"
            >
              احجزي عبر واتساب
            </a>
            <SplitLink to="/services" className="glass rounded-full px-7 py-3">
              كل الخدمات
            </SplitLink>
          </div>
          <Socials />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-6xl">
        <h2 className="mb-6 font-arabic text-3xl text-gold-gradient">خدمات أخرى</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {others.map((o) => (
            <SplitLink
              key={o.slug}
              to="/services/$slug"
              params={{ slug: o.slug }}
              className="svc-card block aspect-[4/3]"
            >
              <img
                src={o.image}
                alt={o.title}
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="shade absolute inset-0 -z-10" />
              <div className="flex h-full items-end p-5 font-arabic text-2xl text-primary-foreground">
                {o.title}
              </div>
            </SplitLink>
          ))}
        </div>
      </div>
    </main>
  );
}
