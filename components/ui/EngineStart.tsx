"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "arrive" | "launch";

export function EngineStart({ onComplete }: { onComplete?: () => void }) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("arrive");
  const completedRef = useRef(false);

  const fireComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }
    if (reduced) {
      fireComplete();
      return;
    }
    const raf = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(raf);
  }, [fireComplete]);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("launch"), 1500));
    timers.push(
      window.setTimeout(() => {
        setActive(false);
        fireComplete();
      }, 2100),
    );
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [active, fireComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="engine-start"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[60] overflow-hidden bg-racing-black"
        >
          <motion.img
            src="/hero-rear.png"
            alt=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: phase === "launch" ? 0 : 1,
              scale: phase === "launch" ? 0.7 : 0.85,
            }}
            transition={{
              duration: phase === "launch" ? 0.6 : 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute inset-0 h-full w-full object-contain"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

          {/* Loading progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-racing-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 0.18, 0.42, 0.48, 0.5, 0.74, 0.78, 0.96, 1] }}
              transition={{
                duration: 2.1,
                times: [0, 0.08, 0.22, 0.42, 0.6, 0.72, 0.88, 0.96, 1],
                ease: "linear",
              }}
              className="h-full origin-left bg-racing-red"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
