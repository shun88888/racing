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
