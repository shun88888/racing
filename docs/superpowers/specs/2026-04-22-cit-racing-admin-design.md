# CIT-Racing Admin ページ 設計書

- **Date**: 2026-04-22
- **Status**: Draft
- **Author**: Shunsuke Nakagawa (w/ Claude)

## ゴール

現在 `lib/data.ts` にベタ書きされているコンテンツの一部を、ブラウザ上の管理画面から差し替え/追加/削除できるようにする。DB は使わず、GitHub リポジトリを唯一の真実のソースとする。

### 編集対象スコープ

| セクション | 対象データ | ファイル |
| --- | --- | --- |
| Hero 画像 | `HERO_MEDIA.featureImages` | `content/hero-images.json` |
| Members | `MEMBERS` 配列 | `content/members.json` |
| History | `HISTORY` 配列 | `content/history.json` |
| Next Race | `RACES` 配列 | `content/races.json` |
| Sponsors | `SPONSOR_CATEGORIES` 配列 | `content/sponsors.json` |

### 非スコープ(今回は編集可能にしない)

- `TEAM_MISSION`, `STATS`, `SUPPORT_WAYS`, `NAV_ITEMS`, `CONTACT_INFO`, `SPECIAL_THANKS`, `TEAM_VIDEO`
- 理由: 更新頻度が極めて低く、TS 直編集で十分

## 非機能要件

- **コスト**: 追加サービスなし(GitHub API 無料枠で完結)
- **デプロイ先**: 既存の Vercel プロジェクトに相乗り
- **セキュリティ**: admin は認証必須。平文で取得できる秘匿情報を UI 側に露出させない
- **反映時間**: 保存から 1 分以内にサイトに反映(Vercel 自動ビルド経由)

## アーキテクチャ

```
[ブラウザ] ──> /admin (Next.js App Router)
                │
                ├─ /admin/login  ... パスワード入力フォーム
                ├─ /admin        ... 認証済みの場合のみ表示される編集画面
                │
                └─ /api/admin/save   ... JSON 更新を GitHub に commit
                   /api/admin/upload ... 画像を GitHub に commit
                   /api/admin/login  ... セッション Cookie 発行
                   /api/admin/logout ... Cookie 削除
                                    │
                                    ▼
                             GitHub REST API
                                    │
                                    ▼
                             main ブランチに commit
                                    │
                                    ▼
                             Vercel 自動再デプロイ
```

## データ構造のリファクタ

### Before (現状)

`lib/data.ts` 内に TS オブジェクトとして全データがベタ書き。admin から書き換え不可。

### After

- 編集対象 5 種を JSON に切り出し、`content/*.json` に配置
- `lib/data.ts` は JSON を import して再 export(**外部 API は変えない**)
- 既存コンポーネント(`Hero.tsx`, `Members.tsx` 等)は一切変更不要

### ファイル構成

```
content/
├── hero-images.json    { featureImages: string[] }
├── members.json        Member[]
├── history.json        HistoryEntry[]
├── races.json          Race[]
└── sponsors.json       SponsorCategory[]

lib/data.ts              (型定義 + 編集外データ + JSON import/re-export)
```

### 型整合性

- JSON 側は `Member[]` 等の型を満たす形で保存
- `lib/data.ts` で `as Member[]` アサーションで読み込む
- 型違反が発生した場合はビルドが失敗する(= 事故を早期発見できる)

## 認証

### 方式

単一パスワード + HMAC 署名付き HttpOnly Cookie。

### フロー

1. 管理者が `/admin` にアクセス
2. Cookie 未検証なら `/admin/login` へリダイレクト(Next.js middleware で判定)
3. パスワード入力 → `/api/admin/login` で `process.env.ADMIN_PASSWORD` と比較
4. 一致 → HMAC 署名付きトークン(有効期限 7 日)を `HttpOnly` + `Secure` + `SameSite=Lax` Cookie で発行
5. 以降 `/admin/*` と `/api/admin/save`, `/api/admin/upload` は Cookie 検証を通過したリクエストのみ許可
6. ログアウトは Cookie 削除

### セキュリティ対策

- Cookie: `HttpOnly`, `Secure` (本番), `SameSite=Lax`
- トークン: `{ exp: <unix-sec> }` を HMAC-SHA256 で署名(秘密鍵は `ADMIN_SECRET`)
- ブルートフォース対策: メモリ上で IP 単位に失敗回数をカウント、5 回失敗で 15 分ロック
- パスワード・トークンは一切クライアントに露出させない

### 必要な環境変数

| 変数名 | 用途 | 例 |
| --- | --- | --- |
| `ADMIN_PASSWORD` | ログイン用パスワード | `someStrongPassword123` |
| `ADMIN_SECRET` | Cookie 署名用秘密鍵(32 文字推奨) | `openssl rand -hex 32` で生成 |
| `GITHUB_TOKEN` | GitHub コミット用 fine-grained PAT(repo scope) | `github_pat_xxx` |
| `GITHUB_REPO` | 対象リポジトリ | `shun88888/racing` |

## admin UI

### レイアウト

```
┌─────────────────────────────────────────────┐
│  CIT-RACING ADMIN              [ログアウト] │
├─────────────┬───────────────────────────────┤
│ ▸ HERO 画像 │                                │
│   MEMBERS   │     (選択中セクションの        │
│   HISTORY   │      編集画面)                  │
│   NEXT RACE │                                │
│   SPONSORS  │                                │
│             │                    [保存]      │
└─────────────┴───────────────────────────────┘
```

### セクションごとの UI 詳細

#### Hero 画像

- 現在の `featureImages` をサムネグリッドで表示
- ドラッグ&ドロップで並べ替え
- 「画像を追加」ボタン → ファイル選択 → アップロード → 末尾に追加
- 各サムネに「削除」ボタン

#### Members

- カードリスト表示(写真 + 名前 + 役職)
- カードクリックで編集ダイアログ(name/reading/role/squad/year/photo)
- 「メンバーを追加」ボタン
- ドラッグで並べ替え、各カードに「削除」ボタン
- photo フィールドは画像アップローダー同梱

#### History

- テーブル表示(year / event / headline / detail / highlight)
- 行クリックで編集ダイアログ
- 「履歴を追加」ボタン
- ドラッグで並べ替え、各行に「削除」ボタン

#### Next Race

- カードリスト(name / date / location / image)
- カードクリックで編集ダイアログ(日付ピッカー付き)
- 画像アップローダー同梱
- 追加/削除/並べ替え

#### Sponsors

- カテゴリ単位のアコーディオン
- 各カテゴリ内に `companies` 配列を表示(テキスト入力リスト)
- カテゴリ追加/削除/並べ替え
- 会社追加/削除/並べ替え

### 共通挙動

- **保存はセクション単位**(Hero を編集しても Members には影響しない)
- 未保存の変更があるまま離れようとしたら確認ダイアログ
- 保存後「反映まで 1 分ほどお待ちください」トースト表示
- エラー時は赤トースト、未保存 state を維持

### 画像アップロード

1. ドラッグ&ドロップ or クリックでファイル選択
2. クライアントで `POST /api/admin/upload` に multipart/form-data で送信
3. サーバーで base64 化 → GitHub Contents API で `public/uploads/<timestamp>-<原ファイル名>` としてコミット
4. コミット成功後、サーバーがパス(`/uploads/xxx.jpg`)を返す
5. クライアントは受け取ったパスを JSON state に反映(次の「保存」で確定)

現時点ではクライアント側・サーバー側いずれでもリサイズ/webp 変換は行わない。Next.js `next/image` を通らない `<img>` 直参照のため、ファイルサイズに留意する必要がある。必要なら将来的に別 PR で最適化を追加。

## 保存/コミット処理

### JSON 保存

- エンドポイント: `POST /api/admin/save`
- ボディ: `{ section: "members" | "history" | "races" | "sponsors" | "hero-images", data: unknown }`
- 処理:
  1. Cookie 検証 → NG なら 401
  2. `section` をホワイトリスト検証
  3. `data` を `JSON.stringify(data, null, 2)` で整形
  4. GitHub Contents API で `content/<section>.json` の sha を取得
  5. 新 content で `PUT /repos/{repo}/contents/content/{section}.json` を呼ぶ
     - commit message: `content: update <section> via admin (YYYY-MM-DD HH:mm)`
     - branch: `main`
  6. 成功 → 200、失敗 → 500 + エラーメッセージ

### 画像保存

- エンドポイント: `POST /api/admin/upload`
- ボディ: multipart/form-data(file フィールドに画像 1 枚)
- 処理:
  1. Cookie 検証
  2. ファイルサイズ上限チェック(10MB、超過は 413)
  3. MIME タイプ検証(`image/jpeg`, `image/png`, `image/webp` のみ)
  4. base64 化 → GitHub Contents API で `public/uploads/<timestamp>-<sanitized-filename>` にコミット
  5. 成功 → `{ path: "/uploads/xxx.jpg" }` を返す

### コミット粒度

1 保存 = 1 コミット。履歴を見れば何をいつ誰が変更したか追える(現状は admin が一人なので「誰が」は省略)。

## エラー処理

| 状況 | 挙動 |
| --- | --- |
| Cookie 失効/改竄 | 401 → ログイン画面にリダイレクト |
| GitHub API タイムアウト | フロントにエラーメッセージ表示、ローカル state は維持 |
| GitHub API レート制限(稀) | 「少し待って再試行」メッセージ |
| ネットワーク断 | 「再試行」ボタン表示 |
| バリデーション違反(必須項目抜け等) | フォーム側で保存前にブロック、赤字表示 |

## テスト方針

- **型テスト**: JSON import の型整合は TS コンパイラ任せ
- **手動 E2E**: 開発環境でログイン→編集→保存→GitHub に commit されるまで一連を確認
- **本番動作確認**: Vercel 本番デプロイ後に実際にログインして 1 保存してみる

自動テストは今回は組まない(admin が 1 人・変更頻度低・UI テストコスト > 価値のため)。

## ロールバック

何か事故が起きた時は GitHub 上で `git revert` するだけで元に戻る(= DB なしの大きな利点)。admin UI からの操作で元に戻せない破壊的変更は起こり得ない。

## 将来拡張の余地(今回はやらない)

- 複数管理者(GitHub OAuth 化)
- 画像の自動リサイズ/webp 変換
- プレビュー環境(`next`ブランチへのコミット → Vercel Preview)
- 下書き機能
- 監査ログ
