export type Account = {
  code: string;
  username: string;
  displayName: string;
  avatar: string;
  role: "Owner" | "Admin" | "Staff";
};

export type Session = {
  username: string;
  displayName: string;
  avatar: string;
  role: Account["role"];
  expiresAt: number;
};

const STORAGE_KEY = "axelbot.session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

let memorySession: Session | null = null;

export const accounts: Account[] = [
  {
    code: "AXEL-ROOT-0001",
    username: "axel.dev",
    displayName: "Axel",
    avatar: "Ax",
    role: "Owner",
  },
  {
    code: "KYCKS-STAFF-0427",
    username: "kycks",
    displayName: "Kycks",
    avatar: "Ky",
    role: "Admin",
  },
  {
    code: "BOT-4J12IJ3K45F21",
    username: "bot.axel",
    displayName: "Bot",
    avatar: "Bt",
    role: "Admin",
  },
  {
    code: "GUEST-DEMO-1234",
    username: "guest.demo",
    displayName: "Invité",
    avatar: "Gv",
    role: "Staff",
  },
];

export function loginWithCode(input: string): Account | null {
  const value = input.trim().toUpperCase();
  const account = accounts.find((a) => a.code.toUpperCase() === value);
  if (!account) return null;

  const session: Session = {
    username: account.username,
    displayName: account.displayName,
    avatar: account.avatar,
    role: account.role,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    memorySession = session;
  }

  return account;
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
