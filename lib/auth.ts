import { verifyAccessCode, type AccessCode, type Role } from "./database";

export type Account = AccessCode;
export type { Role };

export type Session = {
  username: string;
  displayName: string;
  avatar: string;
  avatarUrl?: string;
  role: Role;
  expiresAt: number;
};

const STORAGE_KEY = "axelbot.session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

let memorySession: Session | null = null;

export function saveSession(data: Omit<Session, "expiresAt">): Session {
  const session: Session = { ...data, expiresAt: Date.now() + SESSION_DURATION };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    memorySession = session;
  }

  return session;
}

export function loginWithCode(input: string): Session | null {
  const account = verifyAccessCode(input);
  if (!account) return null;

  return saveSession({
    username: account.username,
    displayName: account.displayName,
    avatar: account.avatar,
    role: account.role,
  });
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return memorySession;

    const session = JSON.parse(raw) as Session;
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    memorySession = session;
    return session;
  } catch {
    return memorySession;
  }
}

export function clearSession() {
  memorySession = null;
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
