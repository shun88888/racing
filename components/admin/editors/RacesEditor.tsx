"use client";

import { useState } from "react";
import type { Race } from "@/lib/data";
import { SectionHeader } from "@/components/admin/SectionHeader";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { SortableList } from "@/components/admin/SortableList";

type Props = { initial: Race[] };

function blank(): Race {
  return {
    id: `r${Date.now()}`,
    name: "",
    date: new Date().toISOString(),
    location: "",
    image: "",
    status: "upcoming",
  };
}

function isoToLocal(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function localToIso(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString();
}

export function RacesEditor({ initial }: Props) {
  const [rows, setRows] = useState<Race[]>(initial);

  function updateAt(i: number, patch: Partial<Race>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  return (
    <div>
      <SectionHeader
        title="NEXT RACE"
        actions={
          <>
            <button
              type="button"
              onClick={() => setRows((prev) => [...prev, blank()])}
              className="border border-white/20 px-4 py-2 font-display text-[10px] tracking-[0.3em] text-racing-white/80 transition-colors hover:border-racing-red hover:text-racing-red"
            >
              + レースを追加
            </button>
            <SaveButton section="races" data={rows} />
          </>
        }
      />

      <SortableList<Race>
        items={rows}
        getKey={(r) => r.id}
        onChange={setRows}
        renderItem={(r, i, controls) => (
          <div className="flex gap-4">
            <div className="flex shrink-0 flex-col items-center gap-2">
              {r.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.image} alt="" className="h-24 w-40 object-cover" />
              ) : (
                <div className="flex h-24 w-40 items-center justify-center border border-white/15 text-[9px] text-racing-white/40">
                  NO IMAGE
                </div>
              )}
              <ImageUploader
                label="画像を差し替え"
                onUploaded={(path) => updateAt(i, { image: path })}
              />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3">
              <Field label="名前" value={r.name} onChange={(v) => updateAt(i, { name: v })} full />
              <label className="flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.25em] text-racing-white/50">
                  日時
                </span>
                <input
                  type="datetime-local"
                  value={isoToLocal(r.date)}
                  onChange={(e) => updateAt(i, { date: localToIso(e.target.value) })}
                  className="border border-white/15 bg-racing-black px-2 py-1 text-sm text-racing-white outline-none focus:border-racing-red"
                />
              </label>
              <Field label="場所" value={r.location} onChange={(v) => updateAt(i, { location: v })} />
              <Field
                label="画像 URL(直接編集)"
                value={r.image}
                onChange={(v) => updateAt(i, { image: v })}
                full
              />
              <Field label="ID" value={r.id} onChange={(v) => updateAt(i, { id: v })} />
              <label className="flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.25em] text-racing-white/50">
                  ステータス
                </span>
                <select
                  value={r.status}
                  onChange={(e) =>
                    updateAt(i, { status: e.target.value as Race["status"] })
                  }
                  className="border border-white/15 bg-racing-black px-2 py-1 text-sm text-racing-white outline-none focus:border-racing-red"
                >
                  <option value="upcoming">upcoming</option>
                  <option value="finished">finished</option>
                </select>
              </label>
            </div>
            <div className="shrink-0">{controls}</div>
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
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1 ${full ? "col-span-2" : ""}`}>
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
