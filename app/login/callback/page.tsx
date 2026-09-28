import Link from "next/link";
import { Logo } from "@/components/ui/Layout";
import { DiscordCallback } from "@/components/auth/DiscordCallback";

export const metadata = {
  title: "Connexion Discord",
  description: "Vérification de ton compte Discord pour Axel Bot.",
};

export default function DiscordCallbackPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[400px] w-[720px] -translate-x-1/2 rounded-full bg-brand-400/18 blur-[130px] animate-pulse-soft" />

      <div className="relative z-10 flex w-full flex-col items-center gap-8 animate-fade-up">
        <Link
          href="/"
          className="flex w-fit items-center gap-3 transition hover:opacity-80"
        >
          <Logo size="sm" />
          <span className="font-display text-base font-bold text-cream">
            Axel Bot
          </span>
        </Link>

        <DiscordCallback />
      </div>
    </div>
  );
}
