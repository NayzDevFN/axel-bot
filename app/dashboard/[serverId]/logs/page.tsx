import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Select } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { Badge } from "@/components/ui/Badge";
import { servers, getServer, channels } from "@/lib/servers";

export const metadata = { title: "Logs" };

const logCategories = [
  { key: "mod", icon: "🛡️", label: "Logs de modération", desc: "Warns, timeouts, kicks, bans.", on: true, count: "1 284" },
  { key: "antipub", icon: "🚫", label: "Logs anti-pub", desc: "Messages supprimés et sanctions.", on: true, count: "942" },
  { key: "tickets", icon: "🎫", label: "Logs tickets", desc: "Ouvertures, fermetures, transcripts.", on: true, count: "412" },
  { key: "giveaways", icon: "🎉", label: "Logs giveaways", desc: "Créations, tirages, gagnants.", on: false, count: "58" },
  { key: "members", icon: "👥", label: "Logs membres", desc: "Arrivées, départs, changements de pseudo.", on: true, count: "3 106" },
  { key: "errors", icon: "⚠️", label: "Logs erreurs", desc: "Erreurs internes du bot.", on: true, count: "17" },
];

const sampleLogs = [
  { t: "14:32", cat: "Anti-pub", tone: "danger" as const, msg: "Message supprimé de @spammer dans #général" },
  { t: "14:21", cat: "Modération", tone: "warning" as const, msg: "@flooder a reçu un timeout (10 min)" },
  { t: "14:05", cat: "Membres", tone: "success" as const, msg: "Emma a rejoint le serveur" },
  { t: "13:55", cat: "Tickets", tone: "brand" as const, msg: "Ticket #1042 ouvert par Noah" },
  { t: "13:40", cat: "Erreurs", tone: "neutral" as const, msg: "Rate limit API Discord — retry dans 2 s" },
  { t: "13:12", cat: "Giveaways", tone: "purple" as const, msg: "Giveaway « Rôle VIP exclusif » terminé" },
];

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function LogsPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  if (!getServer(serverId)) notFound();

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
          Module
        </p>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
          📜 Logs
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          Choisis le salon de destination et active les catégories d’événements à
          journaliser.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="📥"
              title="Salon des logs"
              description="Tous les événements activés sont envoyés ici."
              action={<Badge tone="success" dot>Connecté</Badge>}
            />
            <Field label="Salon" htmlFor="log-channel" hint="Il est recommandé de réserver ce salon aux bots.">
              <Select id="log-channel" defaultValue="#logs">
                {channels.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
          </Card>

          <Card>
            <CardHeader
              icon="🗂️"
              title="Catégories de logs"
              description="Active ou désactive chaque type d’événement."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {logCategories.map((c) => (
                <div
                  key={c.key}
                  className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4 transition hover:border-brand-500/35"
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <span>{c.icon}</span> {c.label}
                    </p>
                    <p className="mt-1 text-xs text-muted">{c.desc}</p>
                    <p className="mt-1.5 text-[11px] text-muted/70">
                      {c.count} événements (30 j)
                    </p>
                  </div>
                  <Switch checked={c.on} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader icon="🔧" title="Options d’affichage" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Embeds colorés
                  </p>
                  <p className="text-xs text-muted">
                    Logs présentés dans des embeds Discord.
                  </p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Nettoyage auto
                  </p>
                  <p className="text-xs text-muted">
                    Supprime les logs après 30 jours.
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader
            icon="👀"
            title="Aperçu en direct"
            description="Flux de démonstration."
            action={
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                LIVE
              </span>
            }
          />
          <ul className="space-y-3">
            {sampleLogs.map((l, i) => (
              <li
                key={i}
                className="rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-3.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge tone={l.tone}>{l.cat}</Badge>
                  <span className="text-[11px] text-muted">{l.t}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink">
                  {l.msg}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <SaveBar />
    </div>
  );
}
