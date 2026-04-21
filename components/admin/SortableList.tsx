"use client";

import { ReactNode } from "react";

type Props<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  onChange: (next: T[]) => void;
  renderItem: (item: T, index: number, controls: ReactNode) => ReactNode;
};

export function SortableList<T>({ items, getKey, onChange, renderItem }: Props<T>) {
  function move(from: number, to: number) {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  }

  function remove(at: number) {
    const next = items.slice();
    next.splice(at, 1);
    onChange(next);
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => {
        const controls = (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => move(i, i - 1)}
              disabled={i === 0}
              aria-label="上へ"
              className="border border-white/15 px-2 py-1 text-xs text-racing-white/70 transition-colors hover:border-racing-red disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, i + 1)}
              disabled={i === items.length - 1}
              aria-label="下へ"
              className="border border-white/15 px-2 py-1 text-xs text-racing-white/70 transition-colors hover:border-racing-red disabled:opacity-30"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="削除"
              className="border border-white/15 px-2 py-1 text-xs text-red-400 transition-colors hover:border-red-500"
            >
              削除
            </button>
          </div>
        );
        return (
          <li key={getKey(item, i)} className="border border-white/10 bg-racing-carbon p-4">
            {renderItem(item, i, controls)}
          </li>
        );
      })}
    </ul>
  );
}
