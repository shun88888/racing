"use client";

import { ReactNode } from "react";

export function Marquee({
  children,
  direction = "left",
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`marquee-pause-hover overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex w-max gap-12 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
