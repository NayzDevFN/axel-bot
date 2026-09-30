"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Layout";
import { BotStatus } from "@/components/bot/BotStatus";
import { InviteBotButton } from "@/components/bot/InviteBotButton";
import { clearSession, getSession } from "@/lib/auth";

export function DashboardTopbar() {
  const router = useRouter();
  const session = getSession();

  const logout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="hidden font-display text-sm font-bold tracking-[-0.02em] text-cream sm:inline">
              Axel Bot
            </span>
          </Link>
          <span className="hidden h-5 w-px bg-white/15 sm:inline-block" />
          <Link
            href="/dashboard"
            className="hidden rounded-full px-3 py-1.5 font-display text-[13px] font-bold text-cream/75 transition hover:bg-white/10 hover:text-cream sm:inline-flex"
          >
            Mes serveurs
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <BotStatus />
          <InviteBotButton />

          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-500 text-[11px] font-black text-white">
              {session?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                session?.avatar ?? "?"
              )}
            </span>
            <span className="hidden text-xs font-bold text-cream sm:inline">
              {session?.displayName ?? "—"}
            </span>
            <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-cream/70 sm:inline">
              {session?.role ?? ""}
            </span>
            <button
              type="button"
              onClick={logout}
              title="Se déconnecter"
              className="text-cream/60 transition hover:text-red-400"
            >
              ⎋
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
