"use client";

import { useEffect, useState } from "react";

export type ToastKind = "success" | "error";
export type Toast = { id: number; kind: ToastKind; message: string };

let idSeq = 0;
const listeners = new Set<(t: Toast) => void>();

export function notify(kind: ToastKind, message: string) {
  const t: Toast = { id: ++idSeq, kind, message };
  listeners.forEach((fn) => fn(t));
}

export function ToastHost() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const fn = (t: Toast) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, 5000);
    };
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto min-w-[240px] border px-4 py-3 text-sm font-display tracking-wide ${
            t.kind === "success"
              ? "border-racing-red bg-racing-black text-racing-white"
              : "border-red-500 bg-racing-black text-red-400"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
