import { createFileRoute, notFound } from "@tanstack/react-router";
import { CinemaBg } from "@/components/CinemaBg";
import { Socials } from "@/components/Chrome";
import { SplitLink } from "@/components/Transition";
import { contact, serviceBenefits, serviceShort, serviceTitle, services } from "@/lib/services";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title.ar} | غدير النجار` },
          { name: "description", content: loaderData.short.ar },
          { property: "og:title", content: `${loaderData.title.ar} | غدير النجار` },
          { property: "og:description", content: loaderData.short.ar },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "غير متوفر" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const s = Route.useLoaderData();
  const { t, locale } = useLocale();
  const title = serviceTitle(s, locale);
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <main className="page-shell">
      <CinemaBg image={s.image} />
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-10">
        <div className="rise relative mx-auto w-full max-w-md md:max-w-none">
          <div className="absolute -inset-3 rounded-[1.75rem] bg-gold-gradient opacity-60 blur-lg sm:rounded-[2rem]" />
          <img
            src={s.image}
            alt={title}
            className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-gold sm:rounded-[2rem]"
          />
        </div>
        <div className="glass space-y-4 rounded-[1.75rem] p-5 sm:space-y-5 sm:rounded-[2rem] sm:p-8">
          <p className="rise font-display text-lg italic text-gold-deep sm:text-xl">{s.title.en}</p>
          <h1 className="reveal font-arabic text-4xl text-gold-gradient sm:text-5xl">{title}</h1>
          <p className="rise text-base sm:text-lg" style={{ animationDelay: ".3s" }}>
            {serviceShort(s, locale)}
          </p>
          <ul className="space-y-3">
            {serviceBenefits(s, locale).map((b, i) => (
              <li
                key={b}
                className="rise flex items-center gap-3 text-sm sm:text-base"
                style={{ animationDelay: `${0.45 + i * 0.12}s` }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-gold" />
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <a
              href={`${contact.whatsapp}?text=${encodeURIComponent(t("services.whatsappMsg", { name: title }))}`}
              target="_blank"
              rel="noreferrer"
              className="bg-gold-gradient shadow-gold rounded-full px-7 py-3 text-center text-primary-foreground transition active:scale-95"
            >
              {t("services.book")}
            </a>
            <SplitLink
              to="/services"
              className="glass rounded-full px-7 py-3 text-center active:scale-95"
            >
              {t("services.allServices")}
            </SplitLink>
          </div>
          <Socials />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl sm:mt-16">
        <h2 className="mb-5 font-arabic text-2xl text-gold-gradient sm:mb-6 sm:text-3xl">
          {t("services.others")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {others.map((o) => (
            <SplitLink
              key={o.slug}
              to="/services/$slug"
              params={{ slug: o.slug }}
              className="svc-card block aspect-[16/10] sm:aspect-[4/3]"
            >
              <img
                src={o.image}
                alt={serviceTitle(o, locale)}
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="shade absolute inset-0 -z-10" />
              <div className="flex h-full items-end p-4 font-arabic text-xl text-primary-foreground sm:p-5 sm:text-2xl">
                {serviceTitle(o, locale)}
              </div>
            </SplitLink>
          ))}
        </div>
      </div>
    </main>
  );
}
