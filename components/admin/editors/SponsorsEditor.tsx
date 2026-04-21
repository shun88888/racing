"use client";

import { useState } from "react";
import type { SponsorCategory } from "@/lib/data";
import { SectionHeader } from "@/components/admin/SectionHeader";
import { SaveButton } from "@/components/admin/SaveButton";
import { SortableList } from "@/components/admin/SortableList";

type Props = { initial: SponsorCategory[] };

function blankCategory(): SponsorCategory {
  return { id: `cat-${Date.now()}`, label: "", title: "", companies: [] };
}

export function SponsorsEditor({ initial }: Props) {
  const [cats, setCats] = useState<SponsorCategory[]>(initial);

  function updateCat(i: number, patch: Partial<SponsorCategory>) {
    setCats((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  function addCompany(i: number) {
    updateCat(i, { companies: [...cats[i].companies, ""] });
  }
  function updateCompany(i: number, j: number, value: string) {
    const next = cats[i].companies.slice();
    next[j] = value;
    updateCat(i, { companies: next });
  }
  function removeCompany(i: number, j: number) {
    const next = cats[i].companies.slice();
    next.splice(j, 1);
    updateCat(i, { companies: next });
  }
  function moveCompany(i: number, from: number, to: number) {
    if (to < 0 || to >= cats[i].companies.length) return;
    const next = cats[i].companies.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    updateCat(i, { companies: next });
  }

  return (
    <div>
      <SectionHeader
        title="SPONSORS"
        actions={
          <>
            <button
              type="button"
              onClick={() => setCats((prev) => [...prev, blankCategory()])}
              className="border border-white/20 px-4 py-2 font-display text-[10px] tracking-[0.3em] text-racing-white/80 transition-colors hover:border-racing-red hover:text-racing-red"
            >
              + カテゴリを追加
            </button>
            <SaveButton section="sponsors" data={cats} />
          </>
        }
      />

      <SortableList<SponsorCategory>
        items={cats}
        getKey={(c) => c.id}
        onChange={setCats}
        renderItem={(c, i, controls) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-4">
              <div className="grid flex-1 grid-cols-3 gap-3">
                <Field label="ラベル" value={c.label} onChange={(v) => updateCat(i, { label: v })} />
                <Field label="タイトル" value={c.title} onChange={(v) => updateCat(i, { title: v })} />
                <Field label="ID" value={c.id} onChange={(v) => updateCat(i, { id: v })} />
              </div>
              <div className="shrink-0">{controls}</div>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-[10px] tracking-[0.3em] text-racing-white/60">
                  COMPANIES
                </span>
                <button
                  type="button"
                  onClick={() => addCompany(i)}
                  className="border border-white/15 px-2 py-1 text-[10px] text-racing-white/70 transition-colors hover:border-racing-red"
                >
                  + 追加
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {c.companies.map((company, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <input
                      value={company}
                      onChange={(e) => updateCompany(i, j, e.target.value)}
                      className="flex-1 border border-white/15 bg-racing-black px-2 py-1 text-sm text-racing-white outline-none focus:border-racing-red"
                    />
                    <button
                      type="button"
                      onClick={() => moveCompany(i, j, j - 1)}
                      disabled={j === 0}
                      aria-label="上へ"
                      className="border border-white/15 px-2 py-1 text-xs text-racing-white/70 transition-colors hover:border-racing-red disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCompany(i, j, j + 1)}
                      disabled={j === c.companies.length - 1}
                      aria-label="下へ"
                      className="border border-white/15 px-2 py-1 text-xs text-racing-white/70 transition-colors hover:border-racing-red disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCompany(i, j)}
                      className="border border-white/15 px-2 py-1 text-xs text-red-400 transition-colors hover:border-red-500"
                    >
                      削除
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-display text-[9px] tracking-[0.25em] text-racing-white/50">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-white/15 bg-racing-black px-2 py-1 text-sm text-racing-white outline-none focus:border-racing-red"
      />
    </label>
  );
}
