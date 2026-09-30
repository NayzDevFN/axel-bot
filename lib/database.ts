export type Role = "Owner" | "Admin" | "Staff";

export type AccessCode = {
  code: string;
  username: string;
  displayName: string;
  avatar: string;
  role: Role;
  active: boolean;
  createdAt: number;
};

export type LoginRecord = {
  id: string;
  code: string;
  username: string;
  displayName: string;
  role: Role | null;
  success: boolean;
  at: number;
};

export type DatabaseSchema = {
  version: number;
  accessCodes: AccessCode[];
  logins: LoginRecord[];
};

const STORAGE_KEY = "axelbot.database";
const VERSION = 1;
const MAX_LOGINS = 200;

const SEED: DatabaseSchema = {
  version: VERSION,
  accessCodes: [
    {
      code: "Axel9844391",
      username: "axel",
      displayName: "Axel",
      avatar: "Ax",
      role: "Owner",
      active: true,
      createdAt: 1767225600000,
    },
  ],
  logins: [],
};

function cloneSeed(): DatabaseSchema {
  return {
    version: SEED.version,
    accessCodes: SEED.accessCodes.map((entry) => ({ ...entry })),
    logins: [],
  };
}

function storageAvailable(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function persist(db: DatabaseSchema) {
  if (!storageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    return;
  }
}

export function getDatabase(): DatabaseSchema {
  if (!storageAvailable()) return cloneSeed();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = cloneSeed();
      persist(fresh);
      return fresh;
    }

    const parsed = JSON.parse(raw) as DatabaseSchema;
    if (
      !parsed ||
      parsed.version !== VERSION ||
      !Array.isArray(parsed.accessCodes)
    ) {
      const fresh = cloneSeed();
      persist(fresh);
      return fresh;
    }

    if (!Array.isArray(parsed.logins)) parsed.logins = [];
    return parsed;
  } catch {
    return cloneSeed();
  }
}

function makeId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function recordLogin(db: DatabaseSchema, record: LoginRecord) {
  db.logins.unshift(record);
  if (db.logins.length > MAX_LOGINS) db.logins.length = MAX_LOGINS;
}

export function verifyAccessCode(input: string): AccessCode | null {
  const value = input.trim().toLowerCase();
  const db = getDatabase();

  const account =
    db.accessCodes.find(
      (entry) => entry.active && entry.code.trim().toLowerCase() === value,
    ) ?? null;

  recordLogin(db, {
    id: makeId(),
    code: input.trim(),
    username: account?.username ?? "inconnu",
    displayName: account?.displayName ?? "Inconnu",
    role: account?.role ?? null,
    success: Boolean(account),
    at: Date.now(),
  });
  persist(db);

  return account;
}

export function getAccessCodes(): AccessCode[] {
  return getDatabase().accessCodes;
}

export function getLoginHistory(): LoginRecord[] {
  return getDatabase().logins;
}

export function clearLoginHistory() {
  const db = getDatabase();
  db.logins = [];
  persist(db);
}

export function resetDatabase() {
  persist(cloneSeed());
}
