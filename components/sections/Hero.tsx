"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HERO_MEDIA, TEAM_MISSION } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-screen min-h-[720px] w-full items-end overflow-hidden"
    >
      {/* Background video */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_MEDIA.posterSrc}
          className="hidden h-full w-full object-cover md:block"
        >
          <source src={HERO_MEDIA.videoSrc} type="video/mp4" />
        </video>
        <img
          src={HERO_MEDIA.posterSrc}
          alt=""
          className="h-full w-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-racing-black/60 via-racing-black/30 to-racing-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-racing-black/80 via-racing-black/40 to-racing-black/70" />
      </motion.div>

      {/* Foreground image — right side feature */}
      <motion.div
        style={{ y: imageY, rotate: imageRotate }}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="pointer-events-none absolute right-[-5%] top-[15%] z-[5] hidden h-[70%] w-[58%] md:block lg:right-[-2%] lg:w-[52%]"
      >
        <div className="relative h-full w-full">
          <div className="absolute -left-4 top-0 h-full w-[3px] bg-racing-red" />
          <img
            src={HERO_MEDIA.featureSrc}
            alt=""
            className="h-full w-full object-cover shadow-[0_40px_80px_-20px_rgba(225,6,0,0.4)]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-racing-black/60" />
          <div className="absolute -right-4 bottom-0 h-[3px] w-full bg-racing-red" />

          {/* Data badges overlay */}
          <div className="absolute right-6 top-6 flex flex-col items-end gap-3 md:right-8 md:top-8">
            <div className="flex items-center gap-2 border border-racing-red/60 bg-racing-black/70 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-racing-red" />
              <span className="font-display text-[10px] tracking-[0.25em] text-racing-white">
                LIVE ON TRACK
              </span>
            </div>
            <div className="border border-white/20 bg-racing-black/70 px-3 py-1.5 backdrop-blur-sm">
              <span className="font-display text-[10px] tracking-[0.25em] text-racing-white/70">
                CIT-25 / PROTOTYPE
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <div className="font-display text-xs tracking-[0.3em] text-racing-red">
              CHASSIS
            </div>
            <div className="mt-1 font-display text-3xl font-bold leading-none md:text-4xl">
              CIT-R26
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 md:px-10 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-racing-red" />
          <span className="font-display text-xs tracking-[0.4em] text-racing-red">
            FORMULA STUDENT JAPAN 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-6xl font-bold leading-[0.9] tracking-tight text-racing-white md:text-[8rem] lg:text-[10rem]"
        >
          {TEAM_MISSION.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-racing-white/80 md:text-lg"
        >
          {TEAM_MISSION.subline}。学生の手で創り、極限まで攻める。
          一緒に走ってくださる方々を、探しています。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#sponsorship"
            className="group inline-flex items-center justify-center gap-3 bg-racing-red px-8 py-4 font-display text-sm font-semibold tracking-[0.25em] transition-colors hover:bg-racing-crimson"
          >
            ご支援の相談
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#about"
            className="group inline-flex items-center justify-center gap-3 border border-racing-white/30 px-8 py-4 font-display text-sm font-semibold tracking-[0.25em] transition-colors hover:bg-racing-white/10"
          >
            チームを知る
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-display text-xs tracking-[0.3em] text-racing-white/60">
          SCROLL
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-racing-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
