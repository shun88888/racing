# CIT-Racing Team スポンサー向けLP 設計書

- **作成日**: 2026-04-21
- **対象**: CIT-Racing Team（日本大学生産工学部 学生フォーミュラチーム）
- **目的**: スポンサー獲得向けランディングページ
- **参考**: https://www.ferrari.com/en-EN/formula1
- **既存サイト**: https://citracingteam.wixsite.com/cit-racing（本LPとは別に、新規で構築）

## 1. 概要

Ferrari F1 公式サイトの世界観（黒ベース × 赤アクセント、大胆なタイポグラフィ、滑らかなスクロール演出）をインスピレーションに、CIT-Racing Teamのスポンサー獲得を目的としたランディングページを構築する。

素材は今回すべてダミー（Unsplash / Pexels 等のCC0素材、プレースホルダーSVGロゴ）。文言も仮置きで、後から実データ差し替え可能な構造にする。

## 2. 技術スタック

| レイヤー | 採用 |
|---|---|
| フレームワーク | Next.js 15（App Router） |
| 言語 | TypeScript（strict） |
| スタイリング | Tailwind CSS v4 |
| アニメーション | Framer Motion |
| スムーズスクロール | Lenis |
| フォント | Oswald（見出し）/ Inter（本文）— `next/font` |
| デプロイ想定 | Vercel |
| 言語対応 | 日本語のみ |

## 3. デザイントークン

### カラーパレット

```ts
colors: {
  racing: {
    black:   '#0A0A0A',  // ベース背景
    carbon:  '#141414',  // セクション区切り
    red:     '#E10600',  // メインアクセント
    crimson: '#B30500',  // 濃赤（ホバー時）
    white:   '#F5F5F5',  // タイポ
    gray:    '#8A8A8A',  // サブテキスト
  }
}
```

### タイポグラフィ
- 見出し: `Oswald`（300〜700）
- 本文: `Inter`（400〜600）
- 数字（カウントダウン等）: `Oswald` または等幅数字を `font-variant-numeric: tabular-nums` で

## 4. プロジェクト構造

```
racing/
├── app/
│   ├── layout.tsx              # ルートレイアウト（font, metadata, SmoothScrollProvider）
│   ├── page.tsx                # LP本体（各セクションをcomposite）
│   └── globals.css             # Tailwind directive + カラートークン
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # スクロール追従ヘッダー
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Members.tsx
│   │   ├── Stats.tsx
│   │   ├── Calendar.tsx
│   │   ├── SponsorPlans.tsx
│   │   ├── Sponsors.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── AnimatedText.tsx    # 文字のstaggerアニメ
│   │   ├── CountUp.tsx         # 数値カウントアップ
│   │   ├── Countdown.tsx       # 日時カウントダウン
│   │   └── Marquee.tsx         # 無限横スクロール
│   └── providers/
│       └── SmoothScrollProvider.tsx
├── lib/
│   ├── data.ts                 # ダミーデータ
│   └── utils.ts
├── public/
│   └── images/
│       ├── hero/
│       ├── members/
│       ├── races/
│       └── sponsors/           # SVGプレースホルダー
├── tailwind.config.ts
└── package.json
```

## 5. セクション仕様

### 5.1 Header（固定）
- 初期状態: 背景透明、白ロゴ・白ナビ
- スクロール時: `backdrop-blur-md` + 半透明黒背景（`bg-racing-black/80`）にトランジション
- ナビ: ABOUT / MEMBERS / CALENDAR / SPONSORSHIP / CONTACT
- 右端CTA: 「スポンサー応募」ボタン（赤）
- モバイル: ハンバーガー → フルスクリーンオーバーレイ、リンク下から順にフェードイン
- クリックでLenis経由のスムーズスクロール

### 5.2 Hero
- 背景: レーシング走行動画（mp4、Pexels CC0）+ 上から暗幕グラデ
- モバイルは静止画にフォールバック
- メインコピー: 「PUSH THE LIMIT.」（Oswald、8xl）
- サブコピー: 「CIT-Racing Team — 2026 Formula Student Japan」
- CTA: 「スポンサーになる」（赤）/ 「チームを知る」（白枠）
- アニメ: 文字のstaggerスライドイン、背景ゆっくりズーム（scale 1→1.05、7s）

### 5.3 About
- レイアウト: 左に縦書き風の巨大見出し「ABOUT」、右にミッションテキスト
- ステートメント3つ: ENGINEERING / TEAMWORK / SPEED（各見出し+1〜2行）
- アニメ: 進入時フェードイン+Y軸オフセット、縦見出しはパララックス

### 5.4 Members
- 横並びグリッド（デスクトップ3〜4カラム、モバイル1カラム）
- カード: 画像 + 暗赤→黒グラデオーバーレイ + 名前（大）+ 役職
- ホバー: 画像 1.05 ズーム + 赤オーバーレイ薄がかる
- 人数: 6名（ドライバー2、CE1、空力1、シャーシ1、PT1）
- アニメ: 進入時に順次フェードイン（stagger 0.1s）

### 5.5 Stats
- 4カードを横並び
- 内容: 大会参戦歴 7年 / メンバー 32 / SNSフォロワー 5,200 / イベント露出 24
- アニメ: 進入時にCountUp（0→目標値、1.5s）
- 背景に赤い斜めライン（装飾）のパララックス

### 5.6 Calendar
- 上: 「NEXT RACE」+ 大カウントダウン（DD : HH : MM : SS）
- 下: レース3〜4件のカード（画像、名前、日付、会場）
- ステータス表示（upcoming / finished）
- アニメ: カウントダウン毎秒更新（フリップ風）、カード横スライドイン

### 5.7 SponsorPlans（★目玉）
- 3カラム比較: Bronze / Silver / Gold
- Gold中央配置、少し大きく、赤枠で強調
- 各プランの内容:

| 項目 | Bronze ¥50K〜 | Silver ¥200K〜 | Gold ¥500K〜 |
|---|---|---|---|
| ロゴ掲載 | 小 | 中 | 大 |
| マシン貼付 | — | あり | 目立つ位置 |
| SNS露出 | 1回 | 3回 | 毎戦 |
| イベント招待 | — | あり | 役員MTG含む |
| 年次レポート | — | — | あり |

- 各カードCTA: 「お問い合わせ」→ Contactセクションへスクロール
- アニメ: 進入時にポップアップ、Goldは少し遅れて登場

### 5.8 Sponsors
- スポンサーロゴをマーキー（無限横スクロール）
- 3行 × 行ごとに反対方向にスクロール
- ホバーで停止
- ダミーロゴ12種、SVGプレースホルダー自動生成

### 5.9 Contact
- 2カラム: 左（連絡先・メール・SNSリンク）、右（フォーム）
- フォーム項目: 氏名 / 会社名 / メール / 検討プラン（ラジオ: Bronze/Silver/Gold/未定）/ メッセージ
- 送信: **ダミー実装**（`alert()` + `console.log()`）。v2で実送信連携
- アニメ: inputフォーカスで下線が左→右に赤く伸びる

### 5.10 Footer
- ロゴ + SNSアイコン（X / Instagram / YouTube）+ メール + コピーライト
- シンプル、Ferrari風の大量リンクは踏襲しない

## 6. グローバル演出

### スムーズスクロール
- `SmoothScrollProvider` で全体ラップ、Lenis初期化
- `lerp: 0.1` 程度で慣性強め
- Framer Motion の `useScroll` と統合

### 共通スクロール進入アニメーション
```ts
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
};
```

### パフォーマンス
- 画像は `next/image`、Hero のみ `priority`
- アニメは `transform` / `opacity` のみ使用
- 60fps 維持

### アクセシビリティ
- `prefers-reduced-motion` 尊重（全アニメ無効化）
- 全インタラクティブ要素に `focus-visible`
- `alt` 明示、装飾画像は `alt=""`
- カラーコントラスト AA準拠

### レスポンシブ
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280
- モバイル: 1カラム、Hero動画→静止画、見出しサイズ縮小

## 7. データ構造（`lib/data.ts`）

```ts
export type Member = {
  id: string;
  name: string;
  role: string;
  year: string;
  image: string;
  bio?: string;
};

export type Race = {
  id: string;
  name: string;
  date: string;          // ISO 8601
  location: string;
  image: string;
  status: 'upcoming' | 'finished';
};

export type SponsorPlan = {
  tier: 'bronze' | 'silver' | 'gold';
  priceRange: string;
  highlights: string[];
  featured?: boolean;
};

export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  tier: 'gold' | 'silver' | 'bronze' | 'partner';
  url?: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};
```

## 8. ダミー素材方針

- **レーシング画像**: Unsplash / Pexels（CC0）
- **Hero動画**: Pexels 無料レーシング映像
- **メンバー顔写真**: Unsplash 匿名ポートレート or `randomuser.me`
- **スポンサーロゴ**: SVGプレースホルダー（"SPONSOR 01"〜"SPONSOR 12"）自動生成、実企業名は使用しない

## 9. 実装範囲・スコープ外

### 実装範囲（MVP）
- 全9セクションの静的LP
- スムーズスクロール、スクロール連動アニメ、カウントダウン、マーキー
- レスポンシブ対応
- Contactフォームは**ダミー送信**
- 基本SEOメタ（title / description / OGP）

### スコープ外
- 多言語対応
- 実在スポンサーロゴ
- CMS / 管理画面
- Contactの実メール送信（Resend / Formspree等連携）
- Blog / News詳細ページ
- カスタムカーソル
- 自動テスト（単体・E2E）— 目視確認で進める

## 10. 並列化実装方針

以下3グループに分けて並列化可能：

- **Group A（基盤）**: Next.js init、Tailwind / フォント / カラートークン設定、Lenis + Framer Motion セットアップ、`lib/data.ts`、`public/images` 素材配置
- **Group B（共通UI + レイアウト）**: Header / Footer / SmoothScrollProvider / AnimatedText / CountUp / Countdown / Marquee
- **Group C（各セクション）**: Hero / About / Members / Stats / Calendar / SponsorPlans / Sponsors / Contact

Group A 完了後、B と C を並列実行。最後に `app/page.tsx` で統合。

## 11. 成功基準

- Lighthouse Performance 85+ / Accessibility 95+
- 60fps でスクロール・アニメ動作
- モバイル〜デスクトップで破綻なし
- スポンサー問い合わせCTAが各セクションに自然配置
- `npm run build` がエラーなく通る
- `tsc --noEmit` がエラーなし
