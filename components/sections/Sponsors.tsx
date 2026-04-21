"use client";

import { FadeIn } from "@/components/ui/AnimatedText";
import { Marquee } from "@/components/ui/Marquee";
import {
  SPONSOR_LOGOS,
  type SponsorMark,
} from "@/components/ui/SponsorWordmark";
import { SPECIAL_THANKS } from "@/lib/data";

export function Sponsors() {
  const half = Math.ceil(SPONSOR_LOGOS.length / 2);
  const rowA = SPONSOR_LOGOS.slice(0, half);
  const rowB = SPONSOR_LOGOS.slice(half);

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
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-racing-white/70">
              動力系から開発ツール、素材・制動・冷却まで——
              各領域の企業の皆さまに、資金・物品・技術でご支援いただいています。
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="mt-14 space-y-6 md:mt-20">
        <Marquee direction="left">
          {rowA.map((m) => (
            <SponsorBox key={m.id} mark={m} />
          ))}
        </Marquee>
        <Marquee direction="right">
          {rowB.map((m) => (
            <SponsorBox key={m.id} mark={m} />
          ))}
        </Marquee>
      </div>

      <div className="mt-16 px-5 md:mt-20 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <FadeIn>
            <div className="relative overflow-hidden border border-white/10 bg-racing-carbon p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-racing-red/[0.08] blur-3xl"
              />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="font-display text-[11px] tracking-[0.35em] text-racing-red">
                    SPECIAL THANKS
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-wide">
                    いつも支えてくださる皆さまへ
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-racing-white/70">
                  活動場所、設備、そしてOB・OGの技術的助言が、私たちの挑戦を支えています。
                </p>
              </div>
              <ul className="relative mt-6 grid gap-2 text-sm text-racing-white/85 md:grid-cols-2">
                {SPECIAL_THANKS.map((t) => (
                  <li key={t} className="flex items-start gap-3 leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1 w-3 shrink-0 bg-racing-red"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-14 text-center">
              <a
                href="#sponsorship"
                className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] text-racing-white/70 transition-colors hover:text-racing-red"
              >
                ご支援について詳しく
                <span aria-hidden>→</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function SponsorBox({ mark }: { mark: SponsorMark }) {
  const isLarge = mark.emphasis === "lg";
  const wrapperClass =
    "group relative flex h-24 w-64 shrink-0 items-center justify-center overflow-hidden border border-white/10 bg-white transition-all hover:border-racing-red";
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mark.src}
        alt={mark.name}
        loading="lazy"
        className={
          isLarge
            ? "max-h-full max-w-full scale-[1.6] object-contain transition-transform duration-300 group-hover:scale-[1.7]"
            : "max-h-[70%] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
        }
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-racing-red transition-transform duration-500 group-hover:scale-x-100"
      />
    </>
  );

  if (mark.href) {
    return (
      <a
        href={mark.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={mark.name}
        className={wrapperClass}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className={wrapperClass} aria-label={mark.name}>
      {inner}
    </div>
  );
}
