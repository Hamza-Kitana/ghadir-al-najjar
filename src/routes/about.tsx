import { createFileRoute } from "@tanstack/react-router";
import ghadeer from "@/assets/ghadeer.jpg";
import { CinemaBg } from "@/components/CinemaBg";
import { Socials } from "@/components/Chrome";
import { SplitLink } from "@/components/Transition";
import { contact } from "@/lib/services";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن غدير النجار | أخصائية بشرة" },
      {
        name: "description",
        content: "تعرفي على أخصائية البشرة غدير النجار وفلسفتها في العناية بالبشرة.",
      },
      { property: "og:title", content: "عن غدير النجار" },
      { property: "og:description", content: "Healthy Skin, Beautiful You" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useLocale();
  const stats = [
    { n: "+11", l: t("about.stat1") },
    { n: "100%", l: t("about.stat2") },
    { n: "✦", l: t("about.stat3") },
  ];

  return (
    <main className="page-shell">
      <CinemaBg />
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <div className="rise relative mx-auto w-full max-w-[17rem] sm:max-w-sm">
          <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-gold-gradient opacity-70 sm:rounded-[2.5rem]" />
          <img
            src={ghadeer}
            alt={t("about.name")}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-gold sm:rounded-[2.5rem]"
          />
        </div>
        <div className="space-y-5 text-center md:space-y-6 md:text-start">
          <p className="rise text-sm tracking-[0.4em] text-gold-deep">{t("about.eyebrow")}</p>
          <h1 className="reveal font-arabic text-4xl text-gold-gradient sm:text-5xl md:text-6xl">
            {t("about.name")}
          </h1>
          <p
            className="rise text-base leading-8 sm:text-lg sm:leading-loose"
            style={{ animationDelay: ".3s" }}
          >
            {t("about.body")}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="glass rise rounded-2xl p-3 text-center sm:p-4"
                style={{ animationDelay: `${0.5 + i * 0.12}s` }}
              >
                <div className="font-display text-2xl text-gold-gradient sm:text-3xl">{s.n}</div>
                <div className="text-xs text-muted-foreground sm:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <SplitLink
              to="/services"
              className="bg-gold-gradient shadow-gold inline-block rounded-full px-6 py-3 text-sm text-primary-foreground sm:px-7 sm:text-base"
            >
              {t("about.ctaServices")}
            </SplitLink>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="glass inline-block rounded-full px-6 py-3 text-sm sm:px-7 sm:text-base"
            >
              {t("about.ctaWhatsapp")}
            </a>
          </div>
          <div className="flex justify-center md:justify-start">
            <Socials />
          </div>
        </div>
      </div>
    </main>
  );
}
