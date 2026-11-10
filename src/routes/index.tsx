import { createFileRoute } from "@tanstack/react-router";
import ghadeer from "@/assets/ghadeer.jpg";
import { CinemaBg } from "@/components/CinemaBg";
import { Socials } from "@/components/Chrome";
import { SplitLink } from "@/components/Transition";

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
  return (
    <main className="relative h-[100dvh] overflow-hidden">
      <CinemaBg video="/hero-bg.mp4" />
      <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-6 px-6 pt-20 md:grid-cols-2 md:px-12">
        <section className="order-2 space-y-5 text-center md:order-1 md:text-right">
          <p
            className="rise text-sm tracking-[0.4em] text-gold-deep"
            style={{ animationDelay: ".3s" }}
          >
            SKIN SPECIALIST
          </p>
          <h1 className="font-arabic text-5xl leading-tight md:text-7xl">
            <span
              className="reveal inline-block text-gold-gradient"
              style={{ animationDelay: ".5s" }}
            >
              غدير النجار
            </span>
          </h1>
          <p
            className="rise font-display text-2xl italic text-foreground/80 md:text-3xl"
            style={{ animationDelay: ".9s" }}
          >
            Healthy Skin, Beautiful You
          </p>
          <p
            className="rise mx-auto max-w-md text-muted-foreground md:mx-0"
            style={{ animationDelay: "1.1s" }}
          >
            عناية فاخرة ببشرتك بأحدث التقنيات — لأن نضارتك تستحق الأفضل.
          </p>
          <div
            className="rise flex justify-center gap-3 md:justify-start"
            style={{ animationDelay: "1.25s" }}
          >
            <SplitLink
              to="/services"
              className="bg-gold-gradient shadow-gold rounded-full px-7 py-3 font-medium text-primary-foreground transition hover:scale-105"
            >
              اكتشفي خدماتنا
            </SplitLink>
            <SplitLink
              to="/about"
              className="glass rounded-full px-7 py-3 transition hover:scale-105"
            >
              تعرفي علي
            </SplitLink>
          </div>
          <div className="flex justify-center md:justify-start">
            <Socials />
          </div>
        </section>

        <section className="order-1 flex justify-center md:order-2">
          <div className="rise relative" style={{ animationDelay: ".2s" }}>
            <div className="spin-slow absolute -inset-5 rounded-full border border-dashed border-primary/60" />
            <div className="absolute -inset-2 rounded-full bg-gold-gradient opacity-70 blur-md" />
            <div className="floaty relative h-44 w-44 overflow-hidden rounded-full border-4 border-card shadow-gold sm:h-64 sm:w-64 md:h-[26rem] md:w-[26rem]">
              <img
                src={ghadeer}
                alt="أخصائية البشرة غدير النجار"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
