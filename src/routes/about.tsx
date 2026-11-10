import { createFileRoute } from "@tanstack/react-router";
import ghadeer from "@/assets/ghadeer.jpg";
import { CinemaBg } from "@/components/CinemaBg";
import { Socials } from "@/components/Chrome";
import { SplitLink } from "@/components/Transition";

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
  const stats = [
    { n: "+11", l: "خدمة متخصصة" },
    { n: "100%", l: "عناية شخصية" },
    { n: "✦", l: "أحدث الأجهزة" },
  ];
  return (
    <main className="relative min-h-screen px-5 pb-16 pt-28 md:px-12">
      <CinemaBg />
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1.2fr]">
        <div className="rise relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-gold-gradient opacity-70" />
          <img
            src={ghadeer}
            alt="غدير النجار"
            className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-gold"
          />
        </div>
        <div className="space-y-6">
          <p className="rise text-sm tracking-[0.4em] text-gold-deep">ABOUT ME</p>
          <h1 className="reveal font-arabic text-5xl text-gold-gradient md:text-6xl">
            غدير النجار
          </h1>
          <p className="rise text-lg leading-loose" style={{ animationDelay: ".3s" }}>
            أخصائية عناية بالبشرة، أؤمن أن كل بشرة لها قصتها الخاصة. أقدم جلسات الميني فيشل والجلسات
            العلاجية، ومنها الهايدرا فيشل لتغذية البشرة ونضارتها، وجلسات التغذية والنضارة، إلى جانب
            الديرما بن والتقشيرات والليزر.
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
          <SplitLink
            to="/services"
            className="bg-gold-gradient shadow-gold inline-block rounded-full px-7 py-3 text-primary-foreground"
          >
            شاهدي الخدمات
          </SplitLink>
          <Socials />
        </div>
      </div>
    </main>
  );
}
