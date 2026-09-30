"use client";

import { useEffect, useState } from "react";
import { fetchBotStatus, type BotStatusResult } from "@/lib/bot";

type State = "loading" | "online" | "offline";

export function BotStatus() {
  const [state, setState] = useState<State>("loading");
  const [result, setResult] = useState<BotStatusResult>({
    status: null,
    error: null,
  });

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const data = await fetchBotStatus();
      if (!alive) return;
      setResult(data);
      setState(data.status ? "online" : "offline");
    };

    load();
    const timer = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  if (state === "loading") {
    return (
      <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-cream/60 md:inline-flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cream/50" />
        Connexion au bot…
      </span>
    );
  }

  if (state === "online" && result.status) {
    const count = result.status.guildCount;
    return (
      <span
        title={`API Discord connectée · dernière vérification ${new Date(
          result.status.checkedAt,
        ).toLocaleString("fr-FR")}`}
        className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-cream md:inline-flex"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Axel Bot en ligne
        <span className="text-cream/55">
          · {count} serveur{count > 1 ? "s" : ""}
        </span>
      </span>
    );
  }

  return (
    <span
      title={
        result.error
          ? `API du bot : ${result.error}`
          : "L'API du bot ne répond pas : lance `npm run bot:api`"
      }
      className="hidden items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-200 md:inline-flex"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Bot non connecté
    </span>
  );
}
