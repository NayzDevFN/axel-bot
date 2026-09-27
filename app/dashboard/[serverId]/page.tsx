import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeading } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { servers, getServer, levelStats, roleColors } from "@/lib/servers";
import { serverNav } from "@/lib/content";

export const metadata = { title: "Vue d’ensemble" };

const modules = [
  { key: "moderation", icon: "🛡️", label: "Modération", state: "Activé" },
  { key: "tickets", icon: "🎫", label: "Tickets", state: "Activé" },
  { key: "welcome", icon: "👋", label: "Bienvenue", state: "Activé" },
  { key: "levels", icon: "📈", label: "Niveaux", state: "Activé" },
  { key: "giveaways", icon: "🎉", label: "Giveaways", state: "Activé" },
  { key: "logs", icon: "📜", label: "Logs", state: "Partiel" },
  { key: "roles", icon: "🎭", label: "Rôles", state: "Activé" },
  { key: "settings", icon: "⚙️", label: "Paramètres", state: "Activé" },
];

const recentLogs = [
  { time: "14:32", type: "Modération", text: "Message anti-pub supprimé de @spammer", tone: "danger" as const },
  { time: "14:18", type: "Niveaux", text: "Léa a atteint le niveau 37", tone: "brand" as const },
  { time: "13:55", type: "Tickets", text: "Ticket #1042 ouvert par Noah", tone: "success" as const },
  { time: "13:40", type: "Membres", text: "3 nouveaux membres ont rejoint", tone: "neutral" as const },
  { time: "12:07", type: "Giveaway", text: "Giveaway Nitro : 54 participants", tone: "warning" as const },
];

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function ServerOverviewPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) notFound();

  const nav = serverNav(serverId).slice(1);

  return (
    <div className="animate-fade-up">
      <PageHeading
        eyebrow="Vue d’ensemble"
        title={server.name}
        description={`Résumé de la configuration d’Axel Bot sur ${server.name}.`}
        action={
          <div className="flex gap-2">
            <Button href="/dashboard" variant="secondary" size="sm">
              ← Serveurs
            </Button>
            <Button href={`/dashboard/${serverId}/settings`} size="sm">
              Paramètres
            </Button>
          </div>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Membres", value: server.members.toLocaleString("fr-FR"), icon: "👥", hint: "+128 cette semaine" },
          { label: "En ligne", value: server.online.toLocaleString("fr-FR"), icon: "🟢", hint: "Pic à 1 902" },
          { label: "Membres avec XP", value: String(levelStats.membersWithXp), icon: "📈", hint: `Niveau moyen ${levelStats.averageLevel}` },
          { label: "Messages comptabilisés", value: levelStats.totalMessages.toLocaleString("fr-FR"), icon: "💬", hint: "30 derniers jours" },
        ].map((s) => (
          <Card key={s.label} className="transition hover:border-brand-500/40">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/15 ring-1 ring-brand-500/30">
                {s.icon}
              </span>
              <Badge tone="success">+4,2 %</Badge>
            </div>
            <p className="mt-4 text-2xl font-extrabold text-ink">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
            <p className="mt-2 text-[11px] text-muted/70">{s.hint}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Modules */}
        <Card>
          <CardHeader
            icon="🧩"
            title="Modules installés"
            description="Clique sur un module pour le configurer."
            action={<Badge tone="brand" dot>8 modules</Badge>}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {modules.map((m) => (
              <Link
                key={m.key}
                href={`/dashboard/${serverId}/${m.key}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-3.5 transition hover:border-brand-500/45 hover:bg-brand-500/5"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0e1c3f]/5 text-base ring-1 ring-[#0e1c3f]/10">
                    {m.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {m.label}
                    </span>
                    <span className="block text-[11px] text-muted">
                      {m.state}
                    </span>
                  </span>
                </span>
                <span className="text-muted transition group-hover:translate-x-1 group-hover:text-brand-400">
                  →
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Activité */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="⚡"
              title="Activité récente"
              description="Derniers événements enregistrés."
            />
            <ul className="space-y-3">
              {recentLogs.map((l, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ink">{l.text}</p>
                    <p className="text-[11px] text-muted">
                      {l.time} · {l.type}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              icon="🎉"
              title="Giveaway en cours"
              description="Le giveaway le plus proche de la fin."
            />
            <div className="rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
              <p className="font-semibold text-ink">🎁 Giveaway Nitro</p>
              <p className="mt-1 text-xs text-amber-600">⏱️ 6 jours restants</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="brand">🏆 2 gagnants</Badge>
                <Badge tone="purple">🎉 54 participants</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="secondary" href={`/dashboard/${serverId}/giveaways`}>
                  Gérer
                </Button>
                <Button size="sm" href={`/dashboard/${serverId}/giveaways`}>
                  Voir tout
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader icon="🎭" title="Rôles clés" />
            <div className="flex flex-wrap gap-2">
              {["Staff", "Gérant", "VIP actif bg", "Membre"].map((r) => (
                <span
                  key={r}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold ring-1 ring-inset"
                  style={{
                    color: roleColors[r],
                    backgroundColor: `${roleColors[r]}1f`,
                    borderColor: `${roleColors[r]}55`,
                  }}
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              Navigation complète :
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg bg-[#0e1c3f]/5 px-2.5 py-1 text-[11px] text-muted transition hover:bg-brand-500/15 hover:text-brand-600"
                >
                  {n.icon} {n.label}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
