import { createFileRoute } from "@tanstack/react-router";
import ghadeer from "@/assets/ghadeer.jpg";
import { CinemaBg, SPA_MUSIC_ID } from "@/components/CinemaBg";
import { Socials } from "@/components/Chrome";
import { LocationMap } from "@/components/LocationMap";
import { SplitLink } from "@/components/Transition";
import { contact } from "@/lib/services";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "غدير النجار | أخصائية العناية بالبشرة" },
      {
        name: "description",
        content: "أخصائية البشرة غدير النجار — جلسات هايدرا فيشل، ديرما بن، تقشيرات وليزر.",
      },
      { property: "og:title", content: "غدير النجار | أخصائية العناية بالبشرة" },
      { property: "og:description", content: "Healthy Skin, Beautiful You" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLocale();

  return (
    <main className="home-page relative">
      <CinemaBg
        video="/hero-bg.mp4"
        image="/gallery/photos/studio-01.jpg"
        musicId={SPA_MUSIC_ID}
      />

      <section className="hero-mobile home-hero">
        <div className="hero-shell">
          <section className="hero-portrait rise" style={{ animationDelay: ".15s" }}>
            <div className="spin-slow absolute -inset-4 rounded-full border border-dashed border-primary/55 md:-inset-5" />
            <div className="absolute -inset-1.5 rounded-full bg-gold-gradient opacity-70 blur-md md:-inset-2" />
            <div className="floaty relative overflow-hidden rounded-full border-4 border-card shadow-gold hero-avatar">
              <img
                src={ghadeer}
                alt={t("home.name")}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </section>

          <section className="hero-copy">
            <p
              className="rise text-[0.7rem] tracking-[0.35em] text-gold-deep sm:text-sm sm:tracking-[0.4em]"
              style={{ animationDelay: ".3s" }}
            >
              {t("home.eyebrow")}
            </p>
            <h1 className="font-arabic text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl">
              <span className="name-reflect-wrap reveal" style={{ animationDelay: ".5s" }}>
                <span className="name-reflect text-gold-gradient" data-text={t("home.name")}>
                  {t("home.name")}
                </span>
              </span>
            </h1>
            <p
              className="rise font-display text-xl italic text-foreground/80 sm:text-2xl md:text-3xl"
              style={{ animationDelay: ".85s" }}
            >
              {t("home.tagline")}
            </p>
            <p
              className="rise mx-auto max-w-md text-sm text-muted-foreground sm:text-base md:mx-0"
              style={{ animationDelay: "1.05s" }}
            >
              {t("home.desc")}
            </p>

            <div className="hero-actions rise" style={{ animationDelay: "1.2s" }}>
              <SplitLink
                to="/services"
                className="bg-gold-gradient shadow-gold rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition active:scale-95 sm:px-7 sm:text-base"
              >
                {t("home.ctaServices")}
              </SplitLink>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full px-6 py-3 text-sm transition active:scale-95 sm:px-7 sm:text-base"
              >
                {t("home.ctaWhatsapp")}
              </a>
            </div>

            <div className="hero-socials">
              <Socials />
            </div>
          </section>
        </div>

        <a href="#location" className="home-scroll-hint" aria-label={t("location.title")}>
          <span />
        </a>
      </section>

      <section id="location" className="home-location">
        <div className="home-location-inner">
          <LocationMap />
        </div>
      </section>
    </main>
  );
}
