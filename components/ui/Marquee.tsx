"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction?: "left" | "right";
  gap?: string;
};

export function Marquee({
  children,
  direction = "left",
  gap = "gap-6",
}: Props) {
  const anim = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="marquee-pause-hover relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-racing-black to-transparent md:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-racing-black to-transparent md:w-24"
      />
      <div className={`flex w-max items-center ${gap} ${anim}`}>
        <div className={`flex shrink-0 items-center ${gap}`}>{children}</div>
        <div aria-hidden className={`flex shrink-0 items-center ${gap}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
