"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/AnimatedText";
import { SPONSOR_PLANS } from "@/lib/data";

export function SponsorPlans() {
  return (
    <section
      id="sponsorship"
      className="relative overflow-hidden bg-racing-black px-5 py-24 md:px-10 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,6,0,0.15),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-14 text-center md:mb-20">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-racing-red" />
              <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                SPONSORSHIP PROGRAM
              </span>
              <span className="h-px w-12 bg-racing-red" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              BE PART OF <br className="md:hidden" />
              <span className="text-racing-red">THE RACE.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-racing-white/70 md:text-base">
              目的・ご予算に合わせて3つのサポートプランをご用意しました。
              詳細・カスタムプランはお問い合わせください。
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {SPONSOR_PLANS.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: plan.featured ? 0.3 : i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`relative flex flex-col p-8 md:p-10 ${
                plan.featured
                  ? "order-first border-2 border-racing-red bg-racing-carbon md:order-none md:-my-4 md:scale-[1.02]"
                  : "border border-white/10 bg-racing-carbon"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-racing-red px-4 py-1 font-display text-[10px] tracking-[0.3em]">
                  RECOMMENDED
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`font-display text-xs tracking-[0.3em] ${
                    plan.featured ? "text-racing-red" : "text-racing-gray"
                  }`}
                >
                  {plan.tagline}
                </div>
                <h3 className="mt-2 font-display text-4xl font-bold tracking-wide md:text-5xl">
                  {plan.tierLabel}
                </h3>
                <div className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  {plan.priceRange}
                </div>
              </div>

              <div className="mb-8 h-px w-full bg-white/10" />

              <ul className="flex-1 space-y-3">
                {plan.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm leading-relaxed text-racing-white/80"
                  >
                    <span
                      aria-hidden
                      className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 ${
                        plan.featured ? "bg-racing-red" : "bg-racing-white/40"
                      }`}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center gap-3 px-6 py-4 font-display text-sm font-semibold tracking-[0.25em] transition-colors ${
                  plan.featured
                    ? "bg-racing-red text-racing-white hover:bg-racing-crimson"
                    : "border border-racing-white/30 hover:bg-racing-white/10"
                }`}
              >
                お問い合わせ
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-xs text-racing-gray">
            ※ 金額は年間サポート額の目安です。現物支給・技術協力等、柔軟に対応いたします。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
