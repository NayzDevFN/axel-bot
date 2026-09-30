export const DISCORD_BOT_ID =
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1554188804309655562";

export const BOT_INVITE_URL =
  `https://discord.com/oauth2/authorize?client_id=${DISCORD_BOT_ID}` +
  "&permissions=8&integration_type=0&scope=bot";

const BASE_URL = (
  process.env.NEXT_PUBLIC_BOT_API_URL || "http://localhost:8787"
).replace(/\/+$/, "");

export type BotStatus = {
  ok: boolean;
  online: boolean;
  id: string;
  username: string;
  globalName: string | null;
  avatarUrl: string | null;
  guildCount: number;
  checkedAt: string;
};

export type BotGuild = {
  id: string;
  name: string;
  iconUrl: string | null;
  owner: boolean;
};

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    signal: AbortSignal.timeout(5000),
    headers: { Accept: "application/json" },
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message =
      body && typeof body === "object" && "error" in body
        ? String((body as { error: unknown }).error)
        : `API du bot : HTTP ${res.status}`;
    throw new Error(message);
  }

  return body as T;
}

export type BotStatusResult = {
  status: BotStatus | null;
  error: string | null;
};

export async function fetchBotStatus(): Promise<BotStatusResult> {
  try {
    const data = await getJson<BotStatus>("/api/bot/status");
    if (!data.online) return { status: null, error: null };
    return { status: data, error: null };
  } catch (err) {
    return {
      status: null,
      error: err instanceof Error ? err.message : "API du bot injoignable.",
    };
  }
}

export async function fetchBotGuilds(): Promise<BotGuild[] | null> {
  try {
    const data = await getJson<{ ok: boolean; guilds: BotGuild[] }>(
      "/api/bot/guilds",
    );
    return data.guilds ?? [];
  } catch {
    return null;
  }
}
