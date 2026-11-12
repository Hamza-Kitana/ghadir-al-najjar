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
    <main className="about-page">
      <div className="hidden md:contents">
        <CinemaBg />
      </div>

      <div className="about-mobile md:hidden">
        <section className="about-mobile-hero">
          <img src={ghadeer} alt={t("about.name")} className="about-mobile-photo" />
          <div className="about-mobile-fade" />
        </section>

        <section className="about-mobile-sheet rise">
          <p className="about-mobile-eyebrow">{t("about.eyebrow")}</p>
          <h1 className="about-mobile-title font-arabic text-gold-gradient">{t("about.name")}</h1>
          <p className="about-mobile-body">{t("about.body")}</p>

          <div className="about-mobile-stats">
            {stats.map((s) => (
              <div key={s.l} className="about-mobile-stat">
                <strong className="font-display text-gold-gradient">{s.n}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>

          <div className="about-mobile-actions">
            <SplitLink to="/services" className="about-mobile-cta primary">
              {t("about.ctaServices")}
            </SplitLink>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="about-mobile-cta ghost"
            >
              {t("about.ctaWhatsapp")}
            </a>
          </div>

          <Socials />
        </section>
      </div>

      <div className="page-shell hidden md:block">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <div className="rise relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-gold-gradient opacity-70" />
            <img
              src={ghadeer}
              alt={t("about.name")}
              className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-gold"
            />
          </div>
          <div className="space-y-6 text-start">
            <p className="rise text-sm tracking-[0.4em] text-gold-deep">{t("about.eyebrow")}</p>
            <h1 className="reveal font-arabic text-6xl text-gold-gradient">{t("about.name")}</h1>
            <p className="rise text-lg leading-loose" style={{ animationDelay: ".3s" }}>
              {t("about.body")}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <div
                  key={s.l}
                  className="glass rise rounded-2xl p-4 text-center"
                  style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                >
                  <div className="font-display text-3xl text-gold-gradient">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <SplitLink
                to="/services"
                className="bg-gold-gradient shadow-gold inline-block rounded-full px-7 py-3 text-base text-primary-foreground"
              >
                {t("about.ctaServices")}
              </SplitLink>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="glass inline-block rounded-full px-7 py-3 text-base"
              >
                {t("about.ctaWhatsapp")}
              </a>
            </div>
            <Socials />
          </div>
        </div>
      </div>
    </main>
  );
}
