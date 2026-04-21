"use client";

import { useRef, useState } from "react";
import { notify } from "./Toast";

type Props = {
  onUploaded: (path: string) => void;
  label?: string;
};

export function ImageUploader({ onUploaded, label = "画像をアップロード" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      notify("error", "jpg/png/webp のみアップロード可能です");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      notify("error", "10MB を超える画像はアップロードできません");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        notify("error", body.error ?? `アップロード失敗 (${res.status})`);
        return;
      }
      const data = (await res.json()) as { path: string };
      onUploaded(data.path);
      notify("success", "アップロードしました");
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "通信エラー");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border border-white/20 px-4 py-2 font-display text-[10px] tracking-[0.3em] text-racing-white/80 transition-colors hover:border-racing-red hover:text-racing-red disabled:opacity-50"
      >
        {uploading ? "アップロード中..." : label}
      </button>
    </div>
  );
}
