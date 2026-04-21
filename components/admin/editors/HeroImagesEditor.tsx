"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/admin/SectionHeader";
import { SaveButton } from "@/components/admin/SaveButton";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { SortableList } from "@/components/admin/SortableList";

type Props = { initial: string[] };

export function HeroImagesEditor({ initial }: Props) {
  const [images, setImages] = useState<string[]>(initial);

  const saveData = { featureImages: images };

  return (
    <div>
      <SectionHeader
        title="HERO 画像"
        actions={
          <>
            <ImageUploader onUploaded={(path) => setImages((prev) => [...prev, path])} />
            <SaveButton section="hero-images" data={saveData} />
          </>
        }
      />

      <p className="mb-4 text-xs text-racing-white/60">
        Hero セクションで流れる画像を管理します。ドラッグは未対応 — ↑↓ ボタンで並べ替えてください。
      </p>

      <SortableList<string>
        items={images}
        getKey={(s, i) => `${s}-${i}`}
        onChange={setImages}
        renderItem={(src, _i, controls) => (
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-20 w-28 shrink-0 object-cover" />
            <div className="flex-1 truncate font-mono text-[11px] text-racing-white/70">{src}</div>
            {controls}
          </div>
        )}
      />

      {images.length === 0 && (
        <div className="mt-4 border border-dashed border-white/15 p-8 text-center text-sm text-racing-white/50">
          画像がありません。「画像をアップロード」から追加してください。
        </div>
      )}
    </div>
  );
}
