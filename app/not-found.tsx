import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-black text-brand-500/25">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-sm text-cream/70">
        Cette page n’existe pas ou le serveur demandé n’est pas accessible avec
        ton compte Discord.
      </p>
      <div className="mt-7 flex gap-3">
        <Button href="/" variant="secondary">
          Accueil
        </Button>
        <Button href="/dashboard">Dashboard</Button>
      </div>
      <Link
        href="/dashboard"
        className="mt-6 text-xs text-cream/70 transition hover:text-brand-300"
      >
        ← Retour à mes serveurs
      </Link>
    </div>
  );
}
