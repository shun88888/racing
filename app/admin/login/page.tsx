"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "ログインに失敗しました");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("通信エラー");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-racing-black px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-white/10 bg-racing-carbon p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-racing-red" />
          <span className="font-display text-xs tracking-[0.4em] text-racing-red">
            ADMIN LOGIN
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-wide text-racing-white">
          CIT-RACING ADMIN
        </h1>
        <label className="mt-8 block font-display text-[10px] tracking-[0.3em] text-racing-white/60">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-2 w-full border border-white/20 bg-racing-black px-3 py-2 text-sm text-racing-white outline-none focus:border-racing-red"
        />
        {error && (
          <p className="mt-3 text-xs text-racing-red">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full border border-racing-red bg-racing-red px-4 py-2 font-display text-xs tracking-[0.3em] text-racing-black transition-colors hover:bg-transparent hover:text-racing-red disabled:opacity-50"
        >
          {loading ? "..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}
