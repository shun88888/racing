"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const NAV = [
  { label: "HERO 画像", href: "/admin/hero-images" },
  { label: "MEMBERS", href: "/admin/members" },
  { label: "HISTORY", href: "/admin/history" },
  { label: "NEXT RACE", href: "/admin/races" },
  { label: "SPONSORS", href: "/admin/sponsors" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-racing-black text-racing-white">
      <aside className="w-56 shrink-0 border-r border-white/10 bg-racing-carbon p-6">
        <div className="mb-8 font-display text-xs tracking-[0.3em] text-racing-red">
          CIT-RACING ADMIN
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-l-2 px-3 py-2 font-display text-[11px] tracking-[0.25em] transition-colors ${
                  active
                    ? "border-racing-red bg-white/5 text-racing-white"
                    : "border-transparent text-racing-white/60 hover:text-racing-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={onLogout}
          className="mt-12 w-full border border-white/20 px-3 py-2 font-display text-[10px] tracking-[0.3em] text-racing-white/70 transition-colors hover:border-racing-red hover:text-racing-red"
        >
          ログアウト
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
