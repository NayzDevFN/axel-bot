import Link from "next/link";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Button } from "@/components/ui/Button";
import { SectionTitle, features, homeStats } from "@/lib/content";

const steps = [
  {
    n: "01",
    title: "Connecte-toi",
    text: "Authentifie-toi avec Discord grâce à l’OAuth2 pour accéder à ton espace.",
  },
  {
    n: "02",
    title: "Choisis ton serveur",
    text: "Sélectionne Axel community’s ou l’un de tes autres serveurs Discord.",
  },
  {
    n: "03",
    title: "Configure Axel",
    text: "Active les modules, ajuste les salons et enregistre en un clic.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[130px] animate-pulse-soft" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0e1c3f]/10 bg-white px-4 py-1.5 font-display text-xs font-black text-ink shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
              Nouveau — en ligne sur Axel community’s
            </span>

            <h1
              className="mt-7 font-display font-black leading-[0.92] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.45rem, 8.4vw, 6.1rem)" }}
            >
              Axel Bot
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
              Le bot Discord{" "}
              <strong className="font-bold text-brand-300">tout-en-un</strong> d’Axel
              community’s : modération, tickets, niveaux, giveaways et
              configuration avancée — le tout piloté depuis un dashboard
              professionnel.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/login" size="lg" className="w-full sm:w-auto">
                <DiscordIcon />
                Ajouter à Discord
              </Button>
              <Button
                href="/dashboard"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Ouvrir le Dashboard →
              </Button>
            </div>

            <p className="mt-5 text-xs text-cream/55">
              Aucune donnée réelle pour le moment — données de démonstration.
            </p>
          </div>

          {/* PANNEAU SOMBRE : aperçu du dashboard */}
          <div className="relative mx-auto mt-14 max-w-6xl animate-fade-up">
            <Sparkle className="absolute -left-6 -top-8 hidden text-brand-500 sm:block" />
            <Sparkle className="absolute -right-4 top-1/3 hidden text-white/20 sm:block" />

            <div className="overflow-hidden rounded-[1.75rem] bg-ink p-3 text-cream shadow-[0_26px_80px_rgba(0,0,0,0.28)] sm:p-4">
              <div className="flex items-center gap-2 rounded-t-[1.35rem] border-b border-cream/8 bg-cream/6 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 truncate font-mono text-xs text-cream/50">
                  axel-bots.app/dashboard/axel-community
                </span>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-6">
                {[
                  { icon: "🛡️", label: "Anti-pub", value: "Activé" },
                  { icon: "🎫", label: "Tickets ouverts", value: "7" },
                  { icon: "📈", label: "XP distribué", value: "184k" },
                  { icon: "🎉", label: "Giveaways actifs", value: "2" },
                  { icon: "👋", label: "Welcomes ce mois", value: "412" },
                  { icon: "📜", label: "Logs enregistrés", value: "9,2k" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-[1.35rem] border border-cream/8 bg-cream/6 p-4 transition hover:border-brand-400/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-lg font-black text-brand-300">
                        {s.value}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-cream/55">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {homeStats.map((s) => (
              <div
                key={s.label}
                className="rounded-[1.75rem] border border-[#0e1c3f]/10 bg-white/70 p-5 text-center shadow-[0_16px_38px_rgba(0,0,0,0.06)]"
              >
                <p className="font-display text-2xl font-black text-ink sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <SectionTitle
            eyebrow="Fonctionnalités"
            title="Tout ce dont ton serveur a besoin"
            description="Six modules pensés pour gérer, animer et sécuriser Axel community’s sans quitter le dashboard."
            center
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-[1.75rem] border border-[#0e1c3f]/10 bg-white/80 p-6 shadow-[0_18px_52px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_20px_46px_rgba(0,0,0,0.12)] animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl ring-1 ring-brand-500/20">
                    {f.icon}
                  </span>
                  <span className="rounded-full bg-[#0e1c3f]/6 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-muted">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
                <Link
                  href={f.href}
                  className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-brand-600 transition hover:gap-2.5"
                >
                  Configurer <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="pourquoi" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <SectionTitle
            eyebrow="Comment ça marche"
            title="Opérationnel en 3 étapes"
            description="Pas de configuration compliquée : connecte, sélectionne, configure."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative overflow-hidden rounded-[1.75rem] border border-[#0e1c3f]/10 bg-white/70 p-6 shadow-[0_16px_38px_rgba(0,0,0,0.06)]"
              >
                <span className="absolute -right-3 -top-4 font-display text-7xl font-black text-[#0e1c3f]/5">
                  {s.n}
                </span>
                <p className="font-display text-xs font-black text-brand-600">
                  ÉTAPE {s.n}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-center text-cream shadow-[0_26px_80px_rgba(0,0,0,0.2)] sm:p-14">
            <Sparkle className="absolute left-8 top-8 text-brand-400/60" />
            <Sparkle className="absolute bottom-8 right-10 text-cream/25" />
            <h3 className="mx-auto max-w-2xl font-display text-2xl font-black tracking-[-0.02em] text-cream sm:text-4xl">
              Prêt à donner vie à Axel community’s ?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
              Ouvre le dashboard, connecte-toi avec Discord et pilote chaque
              module en quelques secondes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/login" size="lg">
                <DiscordIcon />
                Ajouter à Discord
              </Button>
              <Link
                href="/dashboard"
                className="inline-flex h-13 items-center justify-center rounded-full border border-cream/28 px-7 font-display text-base font-black text-cream transition hover:-translate-y-0.5 hover:bg-cream hover:text-ink"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="34"
      height="34"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 2c1.4 9.6 8.4 16.6 18 18-9.6 1.4-16.6 8.4-18 18-1.4-9.6-8.4-16.6-18-18C11.6 18.6 18.6 11.6 20 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.432 3a13.6 13.6 0 0 0-.63 1.287 18.27 18.27 0 0 0-5.606 0A13.6 13.6 0 0 0 8.56 3a19.74 19.74 0 0 0-4.887 1.372C.588 8.98-.27 13.474.158 17.906a19.9 19.9 0 0 0 6.03 3.043 14.7 14.7 0 0 0 1.29-2.096 12.9 12.9 0 0 1-2.032-.976c.17-.124.337-.253.498-.386 3.927 1.817 8.18 1.817 12.061 0 .164.133.33.262.499.386-.65.385-1.334.709-2.036.978a14.7 14.7 0 0 0 1.29 2.095 19.86 19.86 0 0 0 6.035-3.043c.5-5.146-.856-9.6-3.474-13.537ZM8.02 15.18c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.201 0 2.176 1.085 2.156 2.418 0 1.334-.955 2.419-2.156 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.201 0 2.176 1.085 2.156 2.418 0 1.334-.955 2.419-2.156 2.419Z" />
    </svg>
  );
}
