"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "@/components/ui/AnimatedText";
import { TEAM_MISSION } from "@/lib/data";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigTextY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-racing-black px-5 py-24 md:px-10 md:py-40"
    >
      <motion.span
        aria-hidden
        style={{ y: bigTextY }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 font-display text-[clamp(10rem,28vw,28rem)] font-bold leading-none tracking-tight text-white/[0.03]"
      >
        ABOUT
      </motion.span>

      <div className="relative mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <div>
          <FadeIn>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-racing-red" />
              <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                ABOUT THE TEAM
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              学生の手で、
              <br />
              <span className="text-racing-red">極限</span>
              を創る。
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-racing-white/70 md:text-lg">
              CIT-Racing Teamは、日本大学生産工学部の学生フォーミュラチーム。
              毎年一台のフォーミュラマシンを設計・製造し、
              学生フォーミュラ日本大会に参戦しています。
              ここでの挑戦は、未来のエンジニアを育てる本物の工学実践です。
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-4">
          {TEAM_MISSION.pillars.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 + i * 0.12}>
              <div className="group relative h-full border border-white/10 bg-racing-carbon p-6 transition-colors hover:border-racing-red md:p-8">
                <div className="mb-4 font-display text-xs tracking-[0.3em] text-racing-red">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-bold tracking-wide md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-racing-white/70">
                  {p.body}
                </p>
                <div className="mt-6 h-px w-0 bg-racing-red transition-all duration-500 group-hover:w-full" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
