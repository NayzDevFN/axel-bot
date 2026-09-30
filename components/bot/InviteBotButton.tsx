"use client";

import { BOT_INVITE_URL } from "@/lib/bot";

type Variant = "topbar" | "hero";

const styles: Record<Variant, string> = {
  topbar:
    "h-8 px-3 text-xs border-white/15 bg-white/10 text-cream hover:bg-white/20 hover:text-cream",
  hero:
    "h-13 w-full px-6 text-base border-transparent bg-ink text-cream hover:bg-brand-600",
};

export function InviteBotButton({ variant = "topbar" }: { variant?: Variant }) {
  return (
    <a
      href={BOT_INVITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Inviter Axel Bot sur ton serveur Discord"
      className={`inline-flex items-center justify-center gap-2 rounded-full border font-display font-black transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] ${styles[variant]}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
      Inviter le bot
    </a>
  );
}
