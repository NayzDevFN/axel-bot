import Link from "next/link";
import { Logo } from "@/components/ui/Layout";

export function SiteFooter() {
  return (
    <footer className="rounded-t-[2.5rem] bg-ink px-4 py-14 text-cream sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <p className="font-display text-lg font-bold text-cream">
                Axel Bot
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Le bot Discord tout-en-un d’Axel community’s. Moderne, fiable et
              entièrement configurable.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5 text-xs font-bold text-cream/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              Axel Bot en ligne
            </span>
          </div>

          <FooterCol
            title="Produit"
            items={[
              { label: "Accueil", href: "/" },
              { label: "Fonctionnalités", href: "/#fonctionnalites" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Connexion", href: "/login" },
            ]}
          />

          <FooterCol
            title="Modules"
            items={[
              {
                label: "Modération",
                href: "/dashboard/axel-community/moderation",
              },
              { label: "Tickets", href: "/dashboard/axel-community/tickets" },
              { label: "Niveaux", href: "/dashboard/axel-community/levels" },
              {
                label: "Giveaways",
                href: "/dashboard/axel-community/giveaways",
              },
            ]}
          />

          <FooterCol
            title="Serveur"
            items={[
              { label: "Axel community’s", href: "/dashboard" },
              { label: "Inviter le bot", href: "/login" },
              { label: "Support", href: "/login" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream/55">
            © {new Date().getFullYear()} Axel Bot — Tous droits réservés.
          </p>
          <p className="text-xs text-cream/55">
            Connexion par code d’accès ·{" "}
            <Link href="/login" className="text-brand-300 hover:underline">
              app/login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="font-display text-sm font-bold text-cream">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href}
              className="text-sm text-cream/65 transition hover:text-brand-300"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
