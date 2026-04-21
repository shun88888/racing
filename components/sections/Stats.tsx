"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "@/components/ui/AnimatedText";
import { CountUp } from "@/components/ui/CountUp";
import { STATS } from "@/lib/data";

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const slashX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-racing-black px-5 py-24 md:px-10 md:py-32"
    >
      <motion.div
        aria-hidden
        style={{ x: slashX }}
        className="pointer-events-none absolute -right-20 top-10 h-[200%] w-[120%] -rotate-12 bg-gradient-to-r from-transparent via-racing-red/[0.08] to-transparent"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-14 text-center md:mb-20">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-racing-red" />
              <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                BY THE NUMBERS
              </span>
              <span className="h-px w-12 bg-racing-red" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              TRACK RECORD
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 bg-racing-black px-4 py-10 md:py-16"
            >
              <div className="font-display text-5xl font-bold text-racing-white tabular-nums md:text-7xl lg:text-8xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="font-display text-xs tracking-[0.3em] text-racing-gray md:text-sm">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
