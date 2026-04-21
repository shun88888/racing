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
