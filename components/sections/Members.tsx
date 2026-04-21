"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/AnimatedText";
import { MEMBERS } from "@/lib/data";

export function Members() {
  return (
    <section
      id="members"
      className="relative bg-racing-carbon px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeIn>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-12 bg-racing-red" />
                <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                  KEY MEMBERS
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                THE DRIVERS <br />& ENGINEERS
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-racing-white/70">
              多様な専門性を持つ学生たちが、それぞれの役割で限界に挑む。
              これがCIT-Racing Teamの中核です。
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative aspect-[3/4] overflow-hidden bg-racing-black"
            >
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-racing-black/40 to-transparent" />
              <div className="absolute inset-0 bg-racing-red/0 transition-colors duration-500 group-hover:bg-racing-red/15" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                <span className="font-display text-[10px] tracking-[0.3em] text-racing-red">
                  {m.role.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-wide md:text-3xl">
                  {m.name}
                </h3>
                <span className="text-xs text-racing-white/60">{m.year}</span>
                {m.bio && (
                  <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-racing-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {m.bio}
                  </p>
                )}
              </div>

              <div className="absolute left-0 top-0 h-0 w-1 bg-racing-red transition-all duration-500 group-hover:h-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
