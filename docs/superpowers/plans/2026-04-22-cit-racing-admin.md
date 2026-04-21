# CIT-Racing Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ブラウザ上の `/admin` ページから Hero 画像・Members・History・Races・Sponsors を編集し、保存時に GitHub へ直接コミット → Vercel 自動再デプロイで反映する仕組みを構築する。

**Architecture:** Next.js App Router に admin ルートを追加。5 種のコンテンツを `content/*.json` に切り出し、`lib/data.ts` は JSON を読み込んで既存の型で再 export(公開側コンポーネントは改修不要)。単一パスワード + HMAC 署名 Cookie で認証、GitHub REST Contents API で `main` に直 commit。

**Tech Stack:** Next.js 16 App Router / React 19 / TypeScript / Tailwind / GitHub REST API(fetch)/ 追加依存ゼロ。

**Spec reference:** `docs/superpowers/specs/2026-04-22-cit-racing-admin-design.md`

**Branch strategy:** 本プランは `main` 直コミットで進める(既存運用に合わせる)。

---

## Task 1: コンテンツの JSON 切り出し

**Files:**
- Create: `content/hero-images.json`
- Create: `content/members.json`
- Create: `content/history.json`
- Create: `content/races.json`
- Create: `content/sponsors.json`
- Modify: `lib/data.ts`

- [ ] **Step 1: `content/hero-images.json` を作成**

```json
{
  "featureImages": [
    "/S__25518083_0.jpg",
    "/S__25518084_0.jpg",
    "/S__25518085_0.jpg",
    "/S__25518086_0.jpg",
    "/S__25518087_0.jpg",
    "/S__25518088_0.jpg",
    "/S__25518089.jpg"
  ]
}
```

- [ ] **Step 2: `content/members.json` を作成**

`lib/data.ts` の `MEMBERS` 配列の値をそのままコピー。`PORTRAIT("photo-...")` で生成されている URL は展開済みの絶対 URL 文字列として書き出す。

```json
[
  {
    "id": "m1",
    "name": "木瀬 悠貴",
    "reading": "YUKI KISE",
    "role": "プロジェクトリーダー",
    "squad": "PROJECT LEADER",
    "year": "生産工学部 2年",
    "photo": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  },
  {
    "id": "m2",
    "name": "君塚 航惺",
    "reading": "KOKI KIMIZUKA",
    "role": "テクニカルディレクター",
    "squad": "TECHNICAL DIRECTOR",
    "year": "生産工学部 2年",
    "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  },
  {
    "id": "m3",
    "name": "木川 冬威",
    "reading": "TOUI KIKAWA",
    "role": "トラックエンジニア / サスペンション班 リーダー",
    "squad": "TRACK ENGINEER",
    "year": "生産工学部 2年",
    "photo": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  },
  {
    "id": "m4",
    "name": "柘植 勇佑",
    "reading": "YUSUKE TSUGE",
    "role": "フレーム班 リーダー",
    "squad": "FRAME",
    "year": "生産工学部 2年",
    "photo": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  },
  {
    "id": "m5",
    "name": "内田 光陽",
    "reading": "KOYO UCHIDA",
    "role": "パワートレイン班 リーダー",
    "squad": "POWERTRAIN",
    "year": "生産工学部 2年",
    "photo": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  },
  {
    "id": "m6",
    "name": "石田 晴太郎",
    "reading": "SEITARO ISHIDA",
    "role": "コックピット班 リーダー",
    "squad": "COCKPIT",
    "year": "生産工学部 2年",
    "photo": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  },
  {
    "id": "m7",
    "name": "土生 柚佑",
    "reading": "YUSUKE HABU",
    "role": "マネジメント班 リーダー",
    "squad": "MANAGEMENT",
    "year": "生産工学部 4年",
    "photo": "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100"
  }
]
```

- [ ] **Step 3: `content/history.json` を作成**

`lib/data.ts` の `HISTORY` 配列をそのまま JSON 化。

```json
[
  {
    "year": "2002",
    "event": "FOUNDED",
    "headline": "CIT-Racing Team 結成",
    "detail": "日本大学生産工学部の学術系公認サークルとして発足。"
  },
  {
    "year": "第6回",
    "event": "FIRST DYNAMIC",
    "headline": "動的審査 初出場",
    "detail": "学生フォーミュラ日本大会の動的競技へ、チームとして初めて進出。"
  },
  {
    "year": "第8回",
    "event": "FIRST FINISH",
    "headline": "エンデュランス 初完走",
    "detail": "最難関の耐久走行を初めて走り切る。"
  },
  {
    "year": "第14回",
    "event": "COMEBACK",
    "headline": "6年ぶりのエンデュランス完走",
    "detail": "長い低迷期を経て、動的競技の主戦場に帰還。"
  },
  {
    "year": "第15回",
    "event": "AWARD",
    "headline": "チーム史上初の全種目完走",
    "detail": "日本自動車工業会会長賞を受賞。",
    "highlight": true
  },
  {
    "year": "第16回",
    "event": "AWARD",
    "headline": "2年連続の全種目完走",
    "detail": "日本自動車工業会会長賞を連続受賞。"
  },
  {
    "year": "第22回",
    "event": "TOP 30",
    "headline": "総合30位 / 会長賞受賞",
    "detail": "上位常連として成績を安定させる。"
  },
  {
    "year": "2025 / 第23回",
    "event": "BEST EVER",
    "headline": "総合18位・ベスト車検賞(ICV)受賞",
    "detail": "チーム史上最高順位を更新。走行性能と設計精度の両面で評価された。",
    "highlight": true
  },
  {
    "year": "2026",
    "event": "NEXT",
    "headline": "次の自己ベストへ",
    "detail": "2026年大会に向け、新体制で設計・製造を開始。"
  }
]
```

- [ ] **Step 4: `content/races.json` を作成**

```json
[
  {
    "id": "r1",
    "name": "Formula Student Japan 2026",
    "date": "2026-09-04T09:00:00+09:00",
    "location": "静岡県 エコパ",
    "image": "/S__25518086_0.jpg",
    "status": "upcoming"
  },
  {
    "id": "r2",
    "name": "Pre-season Test Day",
    "date": "2026-06-14T08:00:00+09:00",
    "location": "袖ヶ浦フォレストレースウェイ",
    "image": "/S__25518089.jpg",
    "status": "upcoming"
  },
  {
    "id": "r3",
    "name": "Shakedown Run",
    "date": "2026-05-10T09:00:00+09:00",
    "location": "日本大学 生産工学部 実験場",
    "image": "/S__25518088_0.jpg",
    "status": "upcoming"
  }
]
```

- [ ] **Step 5: `content/sponsors.json` を作成**

```json
[
  {
    "id": "powertrain",
    "label": "01",
    "title": "動力系",
    "companies": ["HONDA", "GS YUASA"]
  },
  {
    "id": "dev",
    "label": "02",
    "title": "開発・解析ツール",
    "companies": ["SolidWorks", "Autodesk", "IPG Automotive"]
  },
  {
    "id": "manufacturing",
    "label": "03",
    "title": "製造・素材",
    "companies": ["神戸製鋼", "柘植製作所", "三五", "NOK"]
  },
  {
    "id": "chassis",
    "label": "04",
    "title": "シャシ・制動",
    "companies": ["NTN", "RS-R", "FCC", "日立Astemo", "グループ・エム"]
  },
  {
    "id": "cooling",
    "label": "05",
    "title": "冷却系",
    "companies": ["三栄", "三光ラジエター"]
  },
  {
    "id": "others",
    "label": "06",
    "title": "機能部品・サービス",
    "companies": [
      "igus",
      "Stäubli",
      "KYOWA",
      "ナック・ケー・エス",
      "Mynavi Edge",
      "トヨタレンタレース千葉"
    ]
  }
]
```

- [ ] **Step 6: `lib/data.ts` を更新して JSON を読み込む**

以下の差分を適用する:

1. ファイル冒頭に import を追加(`import` ブロックの直下):

```ts
import heroImagesJson from "@/content/hero-images.json";
import membersJson from "@/content/members.json";
import historyJson from "@/content/history.json";
import racesJson from "@/content/races.json";
import sponsorsJson from "@/content/sponsors.json";
```

2. 既存の `const PORTRAIT = ...` と `export const MEMBERS = [...]` 定義を削除し、以下で置き換える:

```ts
export const MEMBERS: Member[] = membersJson as Member[];
```

3. 既存の `export const HISTORY: HistoryEntry[] = [...]` を削除し、以下で置き換える:

```ts
export const HISTORY: HistoryEntry[] = historyJson as HistoryEntry[];
```

4. 既存の `export const RACES: Race[] = [...]` を削除し、以下で置き換える:

```ts
export const RACES: Race[] = racesJson as Race[];
```

5. 既存の `export const SPONSOR_CATEGORIES: SponsorCategory[] = [...]` を削除し、以下で置き換える:

```ts
export const SPONSOR_CATEGORIES: SponsorCategory[] = sponsorsJson as SponsorCategory[];
```

6. 既存の `export const HERO_MEDIA = { ... featureImages: [...] }` を以下で置き換える:

```ts
export const HERO_MEDIA = {
  videoSrc:
    "https://videos.pexels.com/video-files/2103099/2103099-uhd_3840_2160_30fps.mp4",
  posterSrc:
    "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1920&q=80",
  featureSrc: heroImagesJson.featureImages[0] ?? "/S__25518083_0.jpg",
  featureImages: heroImagesJson.featureImages,
};
```

- [ ] **Step 7: 型チェック & ビルド確認**

Run: `npx tsc --noEmit`
Expected: エラーなし(無出力)

Run: `npm run build`
Expected: 成功。既存ページが従来通りビルドされる。

- [ ] **Step 8: Commit**

```bash
git add content/ lib/data.ts
git commit -m "refactor: extract editable content to content/*.json"
```

---

## Task 2: 認証ユーティリティ

**Files:**
- Create: `lib/admin/auth.ts`
- Create: `lib/admin/rate-limit.ts`

- [ ] **Step 1: `lib/admin/auth.ts` を作成**

HMAC-SHA256 で署名付きトークンを作り、Cookie 値として使う。Node.js 標準の `crypto` を使う(追加依存なし)。

```ts
import crypto from "node:crypto";

const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days
export const SESSION_COOKIE = "cit_admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SECRET env var must be set and >= 32 chars");
  }
  return secret;
}

function base64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export function signSession(now: number = Math.floor(Date.now() / 1000)): string {
  const payload = { exp: now + SESSION_TTL_SEC };
  const payloadB64 = base64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest();
  return `${payloadB64}.${base64url(sig)}`;
}

export function verifySession(token: string | undefined | null, now: number = Math.floor(Date.now() / 1000)): boolean {
  if (!token) return false;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return false;

  const expectedSig = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest();
  const givenSig = base64urlDecode(sigB64);
  if (expectedSig.length !== givenSig.length) return false;
  if (!crypto.timingSafeEqual(expectedSig, givenSig)) return false;

  try {
    const payload = JSON.parse(base64urlDecode(payloadB64).toString()) as { exp: number };
    return typeof payload.exp === "number" && payload.exp > now;
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
```

- [ ] **Step 2: `lib/admin/rate-limit.ts` を作成**

ログイン失敗回数を IP 単位でメモリ保持する。シンプルな実装で十分(admin は 1 人)。

```ts
type Entry = { count: number; lockedUntil: number };

const MAX_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;

const store = new Map<string, Entry>();

export function isLocked(ip: string, now: number = Date.now()): boolean {
  const e = store.get(ip);
  if (!e) return false;
  if (e.lockedUntil > now) return true;
  if (e.lockedUntil !== 0 && e.lockedUntil <= now) {
    store.delete(ip);
  }
  return false;
}

export function recordFail(ip: string, now: number = Date.now()): void {
  const e = store.get(ip) ?? { count: 0, lockedUntil: 0 };
  e.count += 1;
  if (e.count >= MAX_FAILS) {
    e.lockedUntil = now + LOCK_MS;
  }
  store.set(ip, e);
}

export function recordSuccess(ip: string): void {
  store.delete(ip);
}
```

- [ ] **Step 3: 型チェック**

Run: `npx tsc --noEmit`
Expected: エラーなし

- [ ] **Step 4: Commit**

```bash
git add lib/admin/
git commit -m "feat(admin): add HMAC session and rate-limit utilities"
```

---

## Task 3: GitHub API クライアント

**Files:**
- Create: `lib/admin/github.ts`

- [ ] **Step 1: `lib/admin/github.ts` を作成**

GitHub Contents API を fetch で直接叩く。ファイル取得(sha 取得用)と更新/作成の両方をカバー。

```ts
const GITHUB_API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token) throw new Error("GITHUB_TOKEN env var is required");
  if (!repo) throw new Error("GITHUB_REPO env var is required (e.g. 'owner/repo')");
  return { token, repo };
}

type GetFileResult = { sha: string; content: string } | null;

async function getFile(path: string): Promise<GetFileResult> {
  const { token, repo } = getConfig();
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${encodeURIComponent(path)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "cit-racing-admin",
    },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getFile ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { sha: string; content: string };
  return { sha: json.sha, content: json.content };
}

export async function commitTextFile(args: {
  path: string;
  content: string;
  message: string;
}): Promise<void> {
  const { token, repo } = getConfig();
  const existing = await getFile(args.path);
  const body: Record<string, unknown> = {
    message: args.message,
    content: Buffer.from(args.content).toString("base64"),
    branch: "main",
  };
  if (existing) body.sha = existing.sha;

  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${encodeURIComponent(args.path)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "cit-racing-admin",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${args.path} ${res.status}: ${await res.text()}`);
}

export async function commitBinaryFile(args: {
  path: string;
  bytes: Buffer;
  message: string;
}): Promise<void> {
  const { token, repo } = getConfig();
  const existing = await getFile(args.path);
  const body: Record<string, unknown> = {
    message: args.message,
    content: args.bytes.toString("base64"),
    branch: "main",
  };
  if (existing) body.sha = existing.sha;

  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${encodeURIComponent(args.path)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "cit-racing-admin",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT ${args.path} ${res.status}: ${await res.text()}`);
}
```

- [ ] **Step 2: 型チェック**

Run: `npx tsc --noEmit`
Expected: エラーなし

- [ ] **Step 3: Commit**

```bash
git add lib/admin/github.ts
git commit -m "feat(admin): add GitHub Contents API client"
```

---

## Task 4: Middleware で /admin をガード

**Files:**
- Create: `middleware.ts`(プロジェクトルート)

- [ ] **Step 1: `middleware.ts` を作成**

Edge runtime では Node 版 `crypto` が使えないので、`verifySession` を Web Crypto で書き直すのではなく、middleware は **存在チェックのみ**(cookie があるかないか)にして、実際の署名検証は各 API route と admin ページのサーバー側で行う。

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "cit_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin 配下は /admin/login を除いて cookie 必須
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const cookie = req.cookies.get(SESSION_COOKIE)?.value;
    if (!cookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

注意: middleware は cookie の存在だけを見る。有効/無効(署名/失効)の検証は admin ページ(RSC)と API route で `verifySession` を使って行う。

- [ ] **Step 2: 型チェック & dev 起動確認**

Run: `npx tsc --noEmit`
Expected: エラーなし

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat(admin): add middleware to gate /admin routes"
```

---

## Task 5: ログイン API & ページ

**Files:**
- Create: `app/api/admin/login/route.ts`
- Create: `app/api/admin/logout/route.ts`
- Create: `app/admin/login/page.tsx`

- [ ] **Step 1: `app/api/admin/login/route.ts` を作成**

```ts
import { NextResponse } from "next/server";
import { checkPassword, signSession, SESSION_COOKIE } from "@/lib/admin/auth";
import { isLocked, recordFail, recordSuccess } from "@/lib/admin/rate-limit";

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}

export async function POST(req: Request) {
  const ip = getIp(req);
  if (isLocked(ip)) {
    return NextResponse.json(
      { error: "ロックされています。15 分後に再試行してください。" },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエスト" }, { status: 400 });
  }

  if (!body.password || !checkPassword(body.password)) {
    recordFail(ip);
    return NextResponse.json({ error: "パスワードが違います" }, { status: 401 });
  }

  recordSuccess(ip);
  const token = signSession();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
```

- [ ] **Step 2: `app/api/admin/logout/route.ts` を作成**

```ts
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
```

- [ ] **Step 3: `app/admin/login/page.tsx` を作成**

```tsx
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
```

- [ ] **Step 4: dev 起動で動作確認**

Run: `npm run dev`
Expected: `http://localhost:3000/admin` にアクセス → `/admin/login` にリダイレクトされる。

※ 本ステップは `ADMIN_PASSWORD`, `ADMIN_SECRET` を `.env.local` に仮設定した状態で行う。例:
```
ADMIN_PASSWORD=testtest
ADMIN_SECRET=0123456789abcdef0123456789abcdef0123456789abcdef
```

間違ったパスワードでエラーメッセージが出ること、正しいパスワードで `/admin` にリダイレクトされることを確認(現時点では `/admin` は未実装なので 404 でも良い)。

- [ ] **Step 5: Commit**

```bash
git add app/api/admin/login app/api/admin/logout app/admin/login
git commit -m "feat(admin): add login/logout API routes and login page"
```

---

## Task 6: admin シェル(レイアウト・サイドバー・ログアウト)

**Files:**
- Create: `app/admin/(private)/layout.tsx`
- Create: `app/admin/(private)/page.tsx`
- Create: `components/admin/AdminShell.tsx`
- Create: `lib/admin/require-session.ts`

Note: `/admin/login` は `(private)` の外に置くため認証 layout は適用されない。`app/admin/layout.tsx` は作らない(root layout だけで十分)。

- [ ] **Step 1: `lib/admin/require-session.ts` を作成**

admin ページ(Server Component)と API route 両方で使うセッション検証ヘルパ。失敗時は redirect / 401 を選択できるよう、boolean を返す。

```ts
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "./auth";

export async function hasValidSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export function readSessionFromRequest(req: Request): boolean {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return verifySession(match?.[1]);
}
```

- [ ] **Step 2: `components/admin/AdminShell.tsx` を作成**

```tsx
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
```

- [ ] **Step 3: `app/admin/(private)/layout.tsx` を作成(認証 + シェル)**

```tsx
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { hasValidSession } from "@/lib/admin/require-session";

export default async function PrivateAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await hasValidSession();
  if (!ok) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
```

- [ ] **Step 4: `app/admin/(private)/page.tsx` を作成(Hero 画像編集にリダイレクト)**

```tsx
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  redirect("/admin/hero-images");
}
```

- [ ] **Step 5: dev 起動で動作確認**

Run: `npm run dev`

1. `http://localhost:3000/admin` にアクセス → `/admin/login` にリダイレクト
2. ログイン成功 → `/admin` → `/admin/hero-images` にリダイレクト → サイドバーが見える(コンテンツはまだ 404/空でも OK)
3. ログアウトボタン → `/admin/login` に戻る

- [ ] **Step 6: Commit**

```bash
git add app/admin/ components/admin/ lib/admin/require-session.ts
git commit -m "feat(admin): add admin shell with sidebar and auth gate"
```

---

## Task 7: 共通 UI コンポーネント(Toast / SaveButton / ImageUploader / SortableList)

**Files:**
- Create: `components/admin/Toast.tsx`
- Create: `components/admin/SaveButton.tsx`
- Create: `components/admin/ImageUploader.tsx`
- Create: `components/admin/SortableList.tsx`
- Create: `components/admin/SectionHeader.tsx`

- [ ] **Step 1: `components/admin/Toast.tsx` を作成**

```tsx
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
```

- [ ] **Step 2: `components/admin/SaveButton.tsx` を作成**

```tsx
"use client";

import { useState } from "react";
import { notify } from "./Toast";

type Props<T> = {
  section: "hero-images" | "members" | "history" | "races" | "sponsors";
  data: T;
  disabled?: boolean;
  onSaved?: () => void;
};

export function SaveButton<T>({ section, data, disabled, onSaved }: Props<T>) {
  const [saving, setSaving] = useState(false);

  async function onClick() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        notify("error", body.error ?? `保存失敗 (${res.status})`);
        return;
      }
      notify("success", "保存しました。反映まで 1 分ほどお待ちください");
      onSaved?.();
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "通信エラー");
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || saving}
      className="border border-racing-red bg-racing-red px-6 py-2 font-display text-xs tracking-[0.3em] text-racing-black transition-colors hover:bg-transparent hover:text-racing-red disabled:opacity-50"
    >
      {saving ? "保存中..." : "保存"}
    </button>
  );
}
```

- [ ] **Step 3: `components/admin/ImageUploader.tsx` を作成**

```tsx
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
```

- [ ] **Step 4: `components/admin/SortableList.tsx` を作成**

ドラッグ&ドロップは入れず、上下移動ボタンで並べ替え(シンプル優先)。

```tsx
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
```

- [ ] **Step 5: `components/admin/SectionHeader.tsx` を作成**

```tsx
import { ReactNode } from "react";

export function SectionHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="h-px w-8 bg-racing-red" />
          <span className="font-display text-[10px] tracking-[0.35em] text-racing-red">
            EDIT
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-wide text-racing-white">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
```

- [ ] **Step 6: `components/admin/AdminShell.tsx` に ToastHost を組み込む**

既存の `AdminShell.tsx` の `return` を以下に差し替え(末尾に `<ToastHost />` を追加):

```tsx
  return (
    <div className="flex min-h-screen bg-racing-black text-racing-white">
      {/* aside とこれまでの main は同じ */}
      <aside className="w-56 shrink-0 border-r border-white/10 bg-racing-carbon p-6">
        {/* ... 既存のまま ... */}
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
      <ToastHost />
    </div>
  );
```

`import { ToastHost } from "./Toast";` を先頭に追加すること。

- [ ] **Step 7: 型チェック**

Run: `npx tsc --noEmit`
Expected: エラーなし

- [ ] **Step 8: Commit**

```bash
git add components/admin/
git commit -m "feat(admin): add shared UI components (toast, save, uploader, sortable)"
```

---

## Task 8: 保存 API route

**Files:**
- Create: `app/api/admin/save/route.ts`

- [ ] **Step 1: `app/api/admin/save/route.ts` を作成**

```ts
import { NextResponse } from "next/server";
import { readSessionFromRequest } from "@/lib/admin/require-session";
import { commitTextFile } from "@/lib/admin/github";

const ALLOWED_SECTIONS = ["hero-images", "members", "history", "races", "sponsors"] as const;
type Section = (typeof ALLOWED_SECTIONS)[number];

function isAllowedSection(v: unknown): v is Section {
  return typeof v === "string" && (ALLOWED_SECTIONS as readonly string[]).includes(v);
}

export async function POST(req: Request) {
  if (!readSessionFromRequest(req)) {
    return NextResponse.json({ error: "未認証" }, { status: 401 });
  }

  let body: { section?: unknown; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正な JSON" }, { status: 400 });
  }

  if (!isAllowedSection(body.section)) {
    return NextResponse.json({ error: "不正なセクション" }, { status: 400 });
  }
  if (body.data === undefined) {
    return NextResponse.json({ error: "data がありません" }, { status: 400 });
  }

  const content = JSON.stringify(body.data, null, 2) + "\n";
  const path = `content/${body.section}.json`;
  const now = new Date().toISOString().replace("T", " ").slice(0, 16);

  try {
    await commitTextFile({
      path,
      content,
      message: `content: update ${body.section} via admin (${now})`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "GitHub コミット失敗" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: 型チェック**

Run: `npx tsc --noEmit`
Expected: エラーなし

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/save
git commit -m "feat(admin): add save API route that commits JSON to GitHub"
```

---

## Task 9: 画像アップロード API route

**Files:**
- Create: `app/api/admin/upload/route.ts`

- [ ] **Step 1: `app/api/admin/upload/route.ts` を作成**

```ts
import { NextResponse } from "next/server";
import { readSessionFromRequest } from "@/lib/admin/require-session";
import { commitBinaryFile } from "@/lib/admin/github";

export const runtime = "nodejs";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
}

export async function POST(req: Request) {
  if (!readSessionFromRequest(req)) {
    return NextResponse.json({ error: "未認証" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "不正なリクエスト" }, { status: 400 });

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file が添付されていません" }, { status: 400 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: "jpg/png/webp のみ可" }, { status: 415 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "10MB 超" }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ts = Date.now();
  const filename = `${ts}-${sanitizeFilename(file.name || "upload")}`;
  const path = `public/uploads/${filename}`;

  try {
    await commitBinaryFile({
      path,
      bytes,
      message: `content: upload image ${filename} via admin`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "アップロード失敗" },
      { status: 500 }
    );
  }

  return NextResponse.json({ path: `/uploads/${filename}` });
}
```

- [ ] **Step 2: 型チェック**

Run: `npx tsc --noEmit`
Expected: エラーなし

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/upload
git commit -m "feat(admin): add image upload API route"
```

---

## Task 10: Hero 画像 エディタ

**Files:**
- Create: `app/admin/(private)/hero-images/page.tsx`
- Create: `components/admin/editors/HeroImagesEditor.tsx`

- [ ] **Step 1: `app/admin/(private)/hero-images/page.tsx` を作成**

```tsx
import heroImages from "@/content/hero-images.json";
import { HeroImagesEditor } from "@/components/admin/editors/HeroImagesEditor";

export default function HeroImagesPage() {
  return <HeroImagesEditor initial={heroImages.featureImages} />;
}
```

- [ ] **Step 2: `components/admin/editors/HeroImagesEditor.tsx` を作成**

```tsx
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
```

- [ ] **Step 3: dev 確認**

`/admin/hero-images` でサムネが並び、↑↓ で並べ替え、削除、アップロードができることを確認。保存は次のタスクで本番エンドポイントが動き始める(save API は既に Task 8 で完成済み)。

- [ ] **Step 4: Commit**

```bash
git add app/admin/\(private\)/hero-images components/admin/editors/HeroImagesEditor.tsx
git commit -m "feat(admin): add hero images editor"
```

---

## Task 11: Members エディタ

**Files:**
- Create: `app/admin/(private)/members/page.tsx`
- Create: `components/admin/editors/MembersEditor.tsx`

- [ ] **Step 1: `app/admin/(private)/members/page.tsx` を作成**

```tsx
import members from "@/content/members.json";
import type { Member } from "@/lib/data";
import { MembersEditor } from "@/components/admin/editors/MembersEditor";

export default function MembersPage() {
  return <MembersEditor initial={members as Member[]} />;
}
```

- [ ] **Step 2: `components/admin/editors/MembersEditor.tsx` を作成**

```tsx
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
```

- [ ] **Step 3: dev 確認**

`/admin/members` で既存 7 名が表示される、追加/編集/削除/並べ替え、写真差し替えが動くことを確認。保存ボタン押下で GitHub に commit されることを確認(`content/members.json` が更新される)。

- [ ] **Step 4: Commit**

```bash
git add app/admin/\(private\)/members components/admin/editors/MembersEditor.tsx
git commit -m "feat(admin): add members editor"
```

---

## Task 12: History エディタ

**Files:**
- Create: `app/admin/(private)/history/page.tsx`
- Create: `components/admin/editors/HistoryEditor.tsx`

- [ ] **Step 1: `app/admin/(private)/history/page.tsx` を作成**

```tsx
import history from "@/content/history.json";
import type { HistoryEntry } from "@/lib/data";
import { HistoryEditor } from "@/components/admin/editors/HistoryEditor";

export default function HistoryPage() {
  return <HistoryEditor initial={history as HistoryEntry[]} />;
}
```

- [ ] **Step 2: `components/admin/editors/HistoryEditor.tsx` を作成**

```tsx
"use client";

import { useState } from "react";
import type { HistoryEntry } from "@/lib/data";
import { SectionHeader } from "@/components/admin/SectionHeader";
import { SaveButton } from "@/components/admin/SaveButton";
import { SortableList } from "@/components/admin/SortableList";

type Props = { initial: HistoryEntry[] };

function blank(): HistoryEntry {
  return { year: "", event: "", headline: "", detail: "", highlight: false };
}

export function HistoryEditor({ initial }: Props) {
  const [rows, setRows] = useState<HistoryEntry[]>(initial);

  function updateAt(i: number, patch: Partial<HistoryEntry>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  return (
    <div>
      <SectionHeader
        title="HISTORY"
        actions={
          <>
            <button
              type="button"
              onClick={() => setRows((prev) => [...prev, blank()])}
              className="border border-white/20 px-4 py-2 font-display text-[10px] tracking-[0.3em] text-racing-white/80 transition-colors hover:border-racing-red hover:text-racing-red"
            >
              + 履歴を追加
            </button>
            <SaveButton section="history" data={rows} />
          </>
        }
      />

      <SortableList<HistoryEntry>
        items={rows}
        getKey={(_, i) => String(i)}
        onChange={setRows}
        renderItem={(r, i, controls) => (
          <div className="flex gap-4">
            <div className="grid flex-1 grid-cols-2 gap-3">
              <Field label="年/回" value={r.year} onChange={(v) => updateAt(i, { year: v })} />
              <Field label="イベント" value={r.event} onChange={(v) => updateAt(i, { event: v })} />
              <Field
                label="見出し"
                value={r.headline}
                onChange={(v) => updateAt(i, { headline: v })}
                full
              />
              <Field
                label="詳細"
                value={r.detail ?? ""}
                onChange={(v) => updateAt(i, { detail: v })}
                full
              />
              <label className="col-span-2 inline-flex items-center gap-2 font-display text-[11px] tracking-[0.2em] text-racing-white/70">
                <input
                  type="checkbox"
                  checked={r.highlight ?? false}
                  onChange={(e) => updateAt(i, { highlight: e.target.checked })}
                />
                HIGHLIGHT
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
```

- [ ] **Step 3: dev 確認**

`/admin/history` で既存 9 件の表示・追加/削除/並べ替え/編集が動くこと。

- [ ] **Step 4: Commit**

```bash
git add app/admin/\(private\)/history components/admin/editors/HistoryEditor.tsx
git commit -m "feat(admin): add history editor"
```

---

## Task 13: Races (Next Race) エディタ

**Files:**
- Create: `app/admin/(private)/races/page.tsx`
- Create: `components/admin/editors/RacesEditor.tsx`

- [ ] **Step 1: `app/admin/(private)/races/page.tsx` を作成**

```tsx
import races from "@/content/races.json";
import type { Race } from "@/lib/data";
import { RacesEditor } from "@/components/admin/editors/RacesEditor";

export default function RacesPage() {
  return <RacesEditor initial={races as Race[]} />;
}
```

- [ ] **Step 2: `components/admin/editors/RacesEditor.tsx` を作成**

```tsx
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

// <input type="datetime-local"> と ISO 文字列の相互変換
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
```

- [ ] **Step 3: dev 確認**

`/admin/races` で既存 3 件の表示、日時ピッカーでの編集、画像アップロード、追加/削除が動くこと。

- [ ] **Step 4: Commit**

```bash
git add app/admin/\(private\)/races components/admin/editors/RacesEditor.tsx
git commit -m "feat(admin): add races editor"
```

---

## Task 14: Sponsors エディタ

**Files:**
- Create: `app/admin/(private)/sponsors/page.tsx`
- Create: `components/admin/editors/SponsorsEditor.tsx`

- [ ] **Step 1: `app/admin/(private)/sponsors/page.tsx` を作成**

```tsx
import sponsors from "@/content/sponsors.json";
import type { SponsorCategory } from "@/lib/data";
import { SponsorsEditor } from "@/components/admin/editors/SponsorsEditor";

export default function SponsorsPage() {
  return <SponsorsEditor initial={sponsors as SponsorCategory[]} />;
}
```

- [ ] **Step 2: `components/admin/editors/SponsorsEditor.tsx` を作成**

```tsx
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
```

- [ ] **Step 3: dev 確認**

`/admin/sponsors` で 6 カテゴリと各社名が表示される、カテゴリ/会社の追加/削除/並べ替え/編集が動くこと。

- [ ] **Step 4: Commit**

```bash
git add app/admin/\(private\)/sponsors components/admin/editors/SponsorsEditor.tsx
git commit -m "feat(admin): add sponsors editor"
```

---

## Task 15: ドキュメント・環境変数例

**Files:**
- Create: `.env.example`
- Modify: `README.md`

- [ ] **Step 1: `.env.example` を作成**

```
# Admin login password (plaintext). Required for /admin.
ADMIN_PASSWORD=change-me

# 32+ char random string for session cookie signing.
# Generate with: openssl rand -hex 32
ADMIN_SECRET=

# Fine-grained GitHub PAT with "Contents: read/write" on this repo.
GITHUB_TOKEN=

# Target repo, e.g. shun88888/racing
GITHUB_REPO=
```

- [ ] **Step 2: `README.md` に admin 節を追記**

`README.md` の末尾に以下を追加(既存の内容は削除しない):

```markdown

## Admin page

`/admin` から以下を編集できます:

- Hero 画像
- Members
- History
- Next Race
- Sponsors

### セットアップ

1. Vercel プロジェクトの Environment Variables に `.env.example` に書かれた 4 つの変数を設定:
   - `ADMIN_PASSWORD` — 管理画面のログインパスワード(管理者間で共有)
   - `ADMIN_SECRET` — セッション Cookie 署名用の 32 文字以上の乱数。`openssl rand -hex 32` で生成
   - `GITHUB_TOKEN` — GitHub の fine-grained PAT。対象リポジトリに `Contents: read/write` 権限
   - `GITHUB_REPO` — `owner/repo` 形式(例: `shun88888/racing`)
2. 再デプロイ
3. `https://<your-domain>/admin/login` にアクセス

### ローカル開発

`.env.local` に同じ変数を設定すれば `npm run dev` でも動作します。
ただしローカルから保存すると本番 GitHub リポジトリに直接コミットされます。
試す時はテスト用のブランチや別リポジトリを `GITHUB_REPO` に指定してください。
```

- [ ] **Step 3: Commit**

```bash
git add .env.example README.md
git commit -m "docs: document admin page setup and env vars"
```

---

## Task 16: E2E 手動チェック & push

**Files:** なし(動作確認のみ)

- [ ] **Step 1: 本番環境変数を Vercel に設定**

Vercel のダッシュボード → Settings → Environment Variables で以下を追加:
- `ADMIN_PASSWORD` = 任意の強いパスワード
- `ADMIN_SECRET` = `openssl rand -hex 32` で生成した文字列
- `GITHUB_TOKEN` = 新規発行した fine-grained PAT(Contents: read/write)
- `GITHUB_REPO` = `shun88888/racing`

- [ ] **Step 2: ローカル dev で最終確認**

Run: `npm run dev`

手動テスト:
1. `/admin` にアクセス → `/admin/login` にリダイレクト
2. 間違ったパスワード → エラー表示
3. 正しいパスワード → `/admin` → `/admin/hero-images` に遷移、既存 7 枚が表示される
4. 1 枚アップロード → サムネ末尾に追加される
5. 保存 → 緑トースト「保存しました。反映まで 1 分ほどお待ちください」
6. GitHub リポジトリを確認 → `content/hero-images.json` と `public/uploads/*.jpg` が commit されている
7. `/admin/members` 〜 `/admin/sponsors` も同様に編集 → 保存で commit されることを確認
8. ログアウト → `/admin` に戻ると `/admin/login` にリダイレクト

- [ ] **Step 3: push**

```bash
git push origin main
```

Vercel が自動再デプロイ → 本番で `/admin/login` にアクセスして同じ確認を実施。

---

## Self-Review Notes(実装者向け)

- **Cookie は middleware では署名検証していない**: Edge runtime では `node:crypto` が使えないため。有効性の判定は admin ページ(Server Component)と API route(Node runtime)側で行う。middleware は「cookie が存在するか」だけで十分なガード(cookie は HttpOnly + Secure なのでフロントから自由に作れない)。
- **`(private)` グループルーティング**: Next.js App Router の仕様で、`app/admin/(private)/layout.tsx` は `/admin/(private)` という URL にはならず、`(private)` 以下のセグメントにだけ layout が適用される。`/admin/login` は `(private)` の外に置くことで認証 layout を回避する。
- **`content/*.json` は GitHub の main ブランチが真のソース**: Vercel はビルド時にリポジトリを clone してくるため、admin が保存 → commit → Vercel 再ビルド → 新しい JSON が import されるという流れ。ローカル dev で保存すると即座にローカルの JSON が書き換わるわけではない(GitHub 経由)ので、dev 中は `git pull` で反映される。
- **画像最適化なし**: `public/uploads/` に置いた画像は `next/image` を通していないので、大きい画像を上げるとページロードが遅くなる可能性がある。本 PR ではスコープ外。
- **同時編集の競合**: admin が 1 人前提なので楽観ロックなし。将来的に PUT の際に `If-Match` ヘッダーで sha をチェックする等の対策を追加可能。
