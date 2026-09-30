"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchDiscordUser, loginWithDiscord } from "@/lib/discordAuth";

export function DiscordCallback() {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const oauthError = params.get("error");

    if (oauthError) {
      setError("La connexion Discord a été annulée.");
      return;
    }

    if (!code) {
      setError("Code de connexion Discord manquant.");
      return;
    }

    fetchDiscordUser(code, state)
      .then((user) => {
        loginWithDiscord(user);
        router.replace("/dashboard");
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Connexion impossible.");
      });
  }, [router]);

  if (error) {
    return (
      <div className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-white p-8 text-center shadow-[0_26px_80px_rgba(0,0,0,0.16)]">
        <p className="text-sm font-bold text-red-500">{error}</p>
        <Link
          href="/login"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 font-display text-sm font-black text-cream transition hover:bg-brand-600"
        >
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-brand-500/30 border-t-brand-500" />
      <p className="text-sm font-bold text-ink">Vérification du compte Discord…</p>
    </div>
  );
}
