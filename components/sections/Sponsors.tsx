"use client";

import { FadeIn } from "@/components/ui/AnimatedText";
import { Marquee } from "@/components/ui/Marquee";
import { SPONSORS } from "@/lib/data";

export function Sponsors() {
  const rowA = SPONSORS.slice(0, 7);
  const rowB = SPONSORS.slice(7, 14);

  return (
    <section className="relative bg-racing-black px-0 py-24 md:py-32">
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[1600px] text-center">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-racing-red" />
              <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                OUR PARTNERS
              </span>
              <span className="h-px w-12 bg-racing-red" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              POWERED BY
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-racing-white/70">
              共に走ってくださるパートナー企業の皆さま。
              あなたの企業のロゴも、ここに並ぶかもしれません。
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="mt-14 space-y-6 md:mt-20">
        <Marquee direction="left">
          {rowA.map((s) => (
            <SponsorLogo key={s.id} name={s.name} logo={s.logo} />
          ))}
        </Marquee>
        <Marquee direction="right">
          {rowB.map((s) => (
            <SponsorLogo key={s.id} name={s.name} logo={s.logo} />
          ))}
        </Marquee>
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-16 text-center">
          <a
            href="#sponsorship"
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] text-racing-white/70 transition-colors hover:text-racing-red"
          >
            スポンサーシップ詳細を見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

function SponsorLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-20 w-60 shrink-0 items-center justify-center bg-racing-carbon/60 opacity-70 transition-opacity hover:opacity-100">
      <img src={logo} alt={name} className="h-full w-full object-contain p-3" />
    </div>
  );
}
