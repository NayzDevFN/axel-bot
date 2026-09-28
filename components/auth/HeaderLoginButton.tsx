"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, getSession, type Session } from "@/lib/auth";

export function HeaderLoginButton() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
  }, []);

  if (!ready) {
    return <span className="h-10 w-24 rounded-full bg-white/10" aria-hidden="true" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 font-display text-[13px] font-black text-cream transition hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-500/20 xl:px-5 xl:text-sm"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Connexion
      </Link>
    );
  }

  const logout = () => {
    clearSession();
    setSession(null);
    router.replace("/");
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-2">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 transition hover:opacity-85"
        title={`Connecté en tant que ${session.displayName}`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-500 text-[11px] font-black text-white">
          {session.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            session.avatar
          )}
        </span>
        <span className="hidden text-xs font-bold text-cream sm:inline">
          {session.displayName}
        </span>
        <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-cream/70 lg:inline">
          {session.role}
        </span>
      </Link>
      <button
        type="button"
        onClick={logout}
        title="Se déconnecter"
        className="grid h-7 w-7 place-items-center rounded-full text-cream/60 transition hover:bg-white/10 hover:text-red-400"
      >
        ⎋
      </button>
    </div>
  );
}
