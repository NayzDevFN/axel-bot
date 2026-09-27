import Link from "next/link";
import { Logo } from "@/components/ui/Layout";
import { LoginButton } from "@/components/auth/LoginButton";
import { DiscordIcon } from "@/app/page";

const benefits = [
  { icon: "🛡️", text: "Accès complet à la configuration d’Axel Bot" },
  { icon: "🏠", text: "Gestion de tes serveurs Discord où tu es Staff" },
  { icon: "🔒", text: "Aucune donnée stockée sans ta permission" },
  { icon: "⚡", text: "Connexion rapide via Discord OAuth2" },
];

export const metadata = {
  title: "Connexion Discord",
  description: "Connecte-toi avec Discord pour accéder au dashboard Axel Bot.",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[400px] w-[720px] -translate-x-1/2 rounded-full bg-brand-400/18 blur-[130px] animate-pulse-soft" />

      <div className="relative z-10 w-full max-w-4xl animate-fade-up">
        <Link
          href="/"
          className="mx-auto mb-8 flex w-fit items-center gap-3 transition hover:opacity-80"
        >
          <Logo size="sm" />
          <span className="font-display text-base font-bold text-cream">
            Axel Bot
          </span>
        </Link>

        <div className="grid overflow-hidden rounded-[1.75rem] border border-[#0e1c3f]/10 bg-white shadow-[0_26px_80px_rgba(0,0,0,0.16)] md:grid-cols-2">
          {/* Formulaire */}
          <div className="p-7 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 font-display text-xs font-black text-brand-700 ring-1 ring-brand-500/25">
              Authentification
            </span>

            <h1 className="mt-5 font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
              Se connecter avec Discord
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Utilise ton compte Discord pour accéder au dashboard d’
              <strong className="font-bold text-ink"> Axel Bot</strong>.
            </p>

            <LoginButton />

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#0e1c3f]/10" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                ou
              </span>
              <span className="h-px flex-1 bg-[#0e1c3f]/10" />
            </div>

            <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-black text-amber-700">
                ⚠️ OAuth2 non configuré
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                L’interface est prête. Renseigne{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-ink">
                  DISCORD_CLIENT_ID
                </code>{" "}
                et{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-ink">
                  DISCORD_CLIENT_SECRET
                </code>{" "}
                dans{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-ink">
                  .env.local
                </code>{" "}
                puis branche la route OAuth2 (voir README).
              </p>
            </div>

            <p className="mt-6 text-xs text-muted">
              En continuant, tu acceptes les conditions d’utilisation et la
              politique de confidentialité d’Axel Bot.
            </p>
          </div>

          {/* Panneau sombre */}
          <div className="relative hidden flex-col justify-center bg-ink p-10 text-cream md:flex">
            <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-brand-500/35 blur-3xl animate-float" />
            <div className="relative">
              <Logo size="lg" />
              <h2 className="mt-6 font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-cream">
                Bienvenue dans le cockpit d’
                <br />
                Axel community’s
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                Un seul espace pour piloter la modération, les tickets, les
                niveaux et les giveaways de ton serveur.
              </p>

              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cream/10 text-sm ring-1 ring-cream/15">
                      {b.icon}
                    </span>
                    <span className="text-sm text-cream/85">{b.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-2 text-xs text-cream/55">
                <DiscordIcon />
                Discord OAuth2 · prêt à connecter
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-cream/70">
          <Link href="/" className="transition hover:text-brand-300">
            ← Retour à l’accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
