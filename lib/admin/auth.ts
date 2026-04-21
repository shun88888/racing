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
