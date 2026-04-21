"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function pad(n: number, w = 2) {
  return n.toString().padStart(w, "0");
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px] md:min-w-[112px]">
      <div className="relative h-14 md:h-24 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center font-display font-semibold text-5xl md:text-8xl tabular-nums text-racing-white"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] md:text-xs tracking-[0.3em] text-racing-gray">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ target }: { target: string | Date }) {
  const targetDate = typeof target === "string" ? new Date(target) : target;
  const [parts, setParts] = useState<Parts>(() => diff(targetDate));

  useEffect(() => {
    setParts(diff(targetDate));
    const id = setInterval(() => setParts(diff(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 md:gap-6">
      <Unit value={pad(parts.days, 3)} label="DAYS" />
      <span className="text-racing-red text-3xl md:text-6xl font-display">:</span>
      <Unit value={pad(parts.hours)} label="HRS" />
      <span className="text-racing-red text-3xl md:text-6xl font-display">:</span>
      <Unit value={pad(parts.minutes)} label="MIN" />
      <span className="text-racing-red text-3xl md:text-6xl font-display">:</span>
      <Unit value={pad(parts.seconds)} label="SEC" />
    </div>
  );
}
