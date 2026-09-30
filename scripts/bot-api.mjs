import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const API = "https://discord.com/api/v10";
const STATUS_TTL_MS = 30_000;
const GUILDS_TTL_MS = 60_000;

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(ROOT, ".env"));
loadEnvFile(path.join(ROOT, ".env.local"));

const PORT = Number(process.env.BOT_API_PORT || 8787);
const TOKEN = process.env.DISCORD_BOT_TOKEN?.trim();

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function discordGet(pathname) {
  if (!TOKEN) {
    throw new HttpError(
      503,
      "DISCORD_BOT_TOKEN manquant : ajoute-le dans .env.local",
    );
  }

  let res;
  try {
    res = await fetch(`${API}${pathname}`, {
      headers: { Authorization: `Bot ${TOKEN}` },
    });
  } catch {
    throw new HttpError(502, "Discord est injoignable (réseau).");
  }

  if (res.status === 401) {
    throw new HttpError(401, "Token du bot invalide ou révoqué.");
  }
  if (res.status === 429) {
    throw new HttpError(429, "Rate limit Discord, réessaie dans quelques secondes.");
  }
  if (!res.ok) {
    throw new HttpError(502, `Discord a répondu ${res.status}.`);
  }

  return res.json();
}

const cache = new Map();

async function cached(key, ttl, loader) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < ttl) return hit.value;
  const value = await loader();
  cache.set(key, { at: Date.now(), value });
  return value;
}

function avatarUrl(id, icon) {
  return icon ? `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=64` : null;
}

async function getStatus() {
  return cached("status", STATUS_TTL_MS, async () => {
    const me = await discordGet("/users/@me");
    const guilds = await discordGet("/users/@me/guilds");
    return {
      ok: true,
      online: true,
      id: me.id,
      username: me.username,
      globalName: me.global_name ?? null,
      avatarUrl: me.avatar
        ? `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png?size=64`
        : null,
      guildCount: Array.isArray(guilds) ? guilds.length : 0,
      checkedAt: new Date().toISOString(),
    };
  });
}

async function getGuilds() {
  return cached("guilds", GUILDS_TTL_MS, async () => {
    const guilds = await discordGet("/users/@me/guilds");
    return {
      ok: true,
      guilds: guilds.map((g) => ({
        id: g.id,
        name: g.name,
        iconUrl: avatarUrl(g.id, g.icon),
        owner: Boolean(g.owner),
      })),
      checkedAt: new Date().toISOString(),
    };
  });
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const route = url.pathname.replace(/\/+$/, "") || "/";

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method !== "GET") {
    send(res, 405, { ok: false, error: "Méthode non autorisée." });
    return;
  }

  try {
    if (route === "/") {
      send(res, 200, {
        ok: true,
        service: "Axel Bot API",
        endpoints: ["/api/bot/status", "/api/bot/guilds"],
        tokenConfigured: Boolean(TOKEN),
      });
      return;
    }
    if (route === "/api/bot/status") {
      send(res, 200, await getStatus());
      return;
    }
    if (route === "/api/bot/guilds") {
      send(res, 200, await getGuilds());
      return;
    }
    send(res, 404, { ok: false, error: "Route inconnue." });
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Erreur interne.";
    if (status === 401) cache.delete("status");
    send(res, status, { ok: false, online: false, error: message });
  }
});

server.listen(PORT, () => {
  console.log("");
  console.log("  Axel Bot API");
  console.log(`  http://localhost:${PORT}/api/bot/status`);
  console.log(`  Token chargé : ${TOKEN ? "oui" : "NON (.env.local manquant)"}`);
  console.log("");
});
