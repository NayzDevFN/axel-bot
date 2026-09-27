import Link from "next/link";
import { PageHeading } from "@/components/ui/Layout";
import { Badge } from "@/components/ui/Badge";
import { servers } from "@/lib/servers";

export const metadata = {
  title: "Mes serveurs",
};

export default function DashboardServersPage() {
  return (
    <div className="animate-fade-up">
      <PageHeading
        eyebrow="Dashboard"
        title="Mes serveurs"
        description="Sélectionne un serveur Discord pour configurer Axel Bot. Seuls les serveurs où tu es Staff sont affichés."
        action={
          <div className="flex gap-2">
            <button
              type="button"
              className="h-11 rounded-xl border border-[#0e1c3f]/10 px-4 text-sm font-semibold text-ink transition hover:bg-cream-2"
            >
              ↻ Actualiser
            </button>
            <Link
              href="/login"
              className="h-11 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(37,99,235,0.9)] transition hover:bg-brand-500"
            >
              + Inviter Axel Bot
            </Link>
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {servers.map((server) => (
          <Link
            key={server.id}
            href={`/dashboard/${server.id}`}
            className="group animate-fade-up rounded-[1.75rem] border border-[#0e1c3f]/10 bg-white/90 p-6 shadow-[0_18px_52px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/45 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-brand-800/30 text-2xl ring-1 ring-brand-500/30">
                {server.icon}
              </span>
              <div className="flex flex-wrap justify-end gap-1.5">
                {server.owner ? <Badge tone="purple">Propriétaire</Badge> : null}
                {server.boost ? <Badge tone="brand">{server.boost}</Badge> : null}
              </div>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-ink transition group-hover:text-brand-600">
              {server.name}
            </h3>
            <p className="mt-1 text-xs text-muted">
              ID : <span className="font-mono">{server.id}</span>
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#0e1c3f]/5 p-3">
                <p className="text-lg font-bold text-ink">
                  {server.members.toLocaleString("fr-FR")}
                </p>
                <p className="text-[11px] text-muted">Membres</p>
              </div>
              <div className="rounded-xl bg-[#0e1c3f]/5 p-3">
                <p className="flex items-center gap-1.5 text-lg font-bold text-emerald-600">
                  {server.online.toLocaleString("fr-FR")}
                </p>
                <p className="text-[11px] text-muted">En ligne</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Badge tone={server.botPresent ? "success" : "warning"} dot>
                {server.botPresent ? "Axel Bot installé" : "Bot absent"}
              </Badge>
              <span className="text-sm font-semibold text-brand-600 transition group-hover:translate-x-1">
                Gérer →
              </span>
            </div>
          </Link>
        ))}

        <button
          type="button"
          className="flex min-h-[260px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-[#0e1c3f]/20 bg-white/85 p-6 text-center transition hover:-translate-y-1 hover:border-brand-500/50 hover:bg-brand-50/60"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0e1c3f]/5 text-xl text-muted ring-1 ring-[#0e1c3f]/10">
            +
          </span>
          <span className="mt-4 text-sm font-semibold text-ink">
            Ajouter un autre serveur
          </span>
          <span className="mt-1.5 text-xs text-muted">
            Autorise Axel Bot sur un nouveau serveur Discord
          </span>
        </button>
      </div>
    </div>
  );
}
