This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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
