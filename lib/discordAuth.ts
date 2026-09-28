import { saveSession, type Session } from "./auth";

export const DISCORD_CLIENT_ID =
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1554188804309655562";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STORAGE_KEY = "axelbot.discord.oauth";

export const ALLOWED_DISCORD_IDS: Record<string, Session["role"]> = {
  "1504642357423898754": "Owner",
  "1327954422277603394": "Admin",
};

const API = "https://discord.com/api/v10";

type PendingOAuth = {
  verifier: string;
  redirect: string;
  state: string;
};

function randomString(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function challenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier),
  );
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function callbackUrl(): string {
  return `${window.location.origin}${BASE_PATH}/login/callback/`;
}

export function isDiscordLoginConfigured(): boolean {
  return Boolean(DISCORD_CLIENT_ID);
}

export async function startDiscordLogin(): Promise<void> {
  const verifier = randomString(64);
  const redirect = callbackUrl();
  const state = randomString(16);

  const pending: PendingOAuth = { verifier, redirect, state };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending));

  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    response_type: "code",
    redirect_uri: redirect,
    scope: "identify",
    state,
    code_challenge: await challenge(verifier),
    code_challenge_method: "S256",
  });

  window.location.assign(`https://discord.com/oauth2/authorize?${params}`);
}

export function readPendingOAuth(): PendingOAuth | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PendingOAuth) : null;
  } catch {
    return null;
  }
}

function clearPendingOAuth() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
};

export async function fetchDiscordUser(code: string): Promise<DiscordUser> {
  const pending = readPendingOAuth();
  if (!pending) {
    throw new Error(
      "Session de connexion expirée. Relance la connexion depuis /login.",
    );
  }
  clearPendingOAuth();

  const body = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: pending.redirect,
    code_verifier: pending.verifier,
  });

  const tokenRes = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!tokenRes.ok) {
    throw new Error("Impossible d'échanger le code avec Discord.");
  }

  const token = (await tokenRes.json()) as { access_token: string };

  const userRes = await fetch(`${API}/users/@me`, {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  if (!userRes.ok) {
    throw new Error("Impossible de récupérer ton compte Discord.");
  }

  return (await userRes.json()) as DiscordUser;
}

export function loginWithDiscord(user: DiscordUser): Session {
  const role = ALLOWED_DISCORD_IDS[user.id];
  if (!role) {
    throw new Error(
      "Ce compte Discord n'est pas autorisé à accéder au dashboard.",
    );
  }

  const displayName = user.global_name?.trim() || user.username;
  const initials = displayName
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return saveSession({
    username: user.username,
    displayName,
    avatar: initials || "Ds",
    avatarUrl: user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
      : undefined,
    role,
  });
}
