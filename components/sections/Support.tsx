"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/AnimatedText";
import { SUPPORT_WAYS } from "@/lib/data";

export function Support() {
  return (
    <section
      id="sponsorship"
      className="relative overflow-hidden bg-racing-black px-5 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,6,0,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-14 text-center md:mb-20">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-racing-red" />
              <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                SUPPORT THE TEAM
              </span>
              <span className="h-px w-12 bg-racing-red" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              一緒に、
              <br className="md:hidden" />
              走ってくれませんか。
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-racing-white/70 md:text-base">
              CIT-Racing Team は、日本大学生産工学部の学生フォーミュラチームです。
              決まったプランや金額はございません。
              ご支援のかたちは、一緒にお話ししながら柔軟に決めさせていただきます。
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {SUPPORT_WAYS.map((w, i) => (
            <motion.article
              key={w.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: (i % 2) * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative flex flex-col border border-white/10 bg-racing-carbon p-7 transition-colors hover:border-racing-red/60 md:p-10"
            >
              <div className="font-display text-[11px] tracking-[0.35em] text-racing-red">
                {w.label}
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
                {w.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-racing-white/75">
                {w.description}
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 font-display text-[10px] tracking-[0.3em] text-racing-gray">
                    たとえば
                  </div>
                  <ul className="space-y-1.5 text-sm text-racing-white/80">
                    {w.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1 w-1 shrink-0 bg-racing-white/40"
                        />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 font-display text-[10px] tracking-[0.3em] text-racing-red">
                    お返しできること
                  </div>
                  <ul className="space-y-1.5 text-sm text-racing-white/80">
                    {w.give.map((g) => (
                      <li key={g} className="flex items-start gap-2 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1 w-1 shrink-0 bg-racing-red"
                        />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 h-px w-0 bg-racing-red transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="max-w-xl text-sm leading-relaxed text-racing-white/70">
              どの形でも、まずは一度お話を聞かせてください。
              ご質問だけでも、チームや活動に興味を持っていただけたら嬉しいです。
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-racing-red px-10 py-4 font-display text-sm font-semibold tracking-[0.25em] transition-colors hover:bg-racing-crimson"
            >
              まずは相談する
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
