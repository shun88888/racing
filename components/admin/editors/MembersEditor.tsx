"use client";

import { useState } from "react";
import type { Member } from "@/lib/data";
import { SectionHeader } from "@/components/admin/SectionHeader";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { SortableList } from "@/components/admin/SortableList";

type Props = { initial: Member[] };

function blankMember(): Member {
  return {
    id: `m${Date.now()}`,
    name: "",
    reading: "",
    role: "",
    squad: "",
    year: "",
    photo: "",
  };
}

export function MembersEditor({ initial }: Props) {
  const [members, setMembers] = useState<Member[]>(initial);

  function updateAt(i: number, patch: Partial<Member>) {
    setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  }

  return (
    <div>
      <SectionHeader
        title="MEMBERS"
        actions={
          <>
            <button
              type="button"
              onClick={() => setMembers((prev) => [...prev, blankMember()])}
              className="border border-white/20 px-4 py-2 font-display text-[10px] tracking-[0.3em] text-racing-white/80 transition-colors hover:border-racing-red hover:text-racing-red"
            >
              + メンバーを追加
            </button>
            <SaveButton section="members" data={members} />
          </>
        }
      />

      <SortableList<Member>
        items={members}
        getKey={(m) => m.id}
        onChange={setMembers}
        renderItem={(m, i, controls) => (
          <div className="flex gap-4">
            <div className="flex shrink-0 flex-col items-center gap-2">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo} alt="" className="h-24 w-20 object-cover" />
              ) : (
                <div className="flex h-24 w-20 items-center justify-center border border-white/15 text-[9px] text-racing-white/40">
                  NO IMAGE
                </div>
              )}
              <ImageUploader
                label="写真を差し替え"
                onUploaded={(path) => updateAt(i, { photo: path })}
              />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3">
              <Field label="名前" value={m.name} onChange={(v) => updateAt(i, { name: v })} />
              <Field label="読み(英)" value={m.reading} onChange={(v) => updateAt(i, { reading: v })} />
              <Field label="役職" value={m.role} onChange={(v) => updateAt(i, { role: v })} full />
              <Field label="班ラベル" value={m.squad} onChange={(v) => updateAt(i, { squad: v })} />
              <Field label="学年" value={m.year} onChange={(v) => updateAt(i, { year: v })} />
              <Field label="ID" value={m.id} onChange={(v) => updateAt(i, { id: v })} />
              <Field
                label="写真 URL(直接編集)"
                value={m.photo ?? ""}
                onChange={(v) => updateAt(i, { photo: v })}
                full
              />
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
