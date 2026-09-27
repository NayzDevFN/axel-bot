import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Input, Select } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { Badge } from "@/components/ui/Badge";
import { servers,
  getServer,
  channels,
  levelStats,
  levelRewards,
  topMembers,
} from "@/lib/servers";

export const metadata = { title: "Niveaux" };

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function LevelsPage({
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
          📈 Niveaux
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          Système XP, annonces de niveau et récompenses pour fidéliser ta
          communauté.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Membres avec XP", value: levelStats.membersWithXp.toLocaleString("fr-FR"), icon: "👥" },
          { label: "Niveau moyen", value: levelStats.averageLevel, icon: "📊" },
          { label: "Messages comptabilisés", value: levelStats.totalMessages.toLocaleString("fr-FR"), icon: "💬" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/15 text-xl ring-1 ring-brand-500/30">
              {s.icon}
            </span>
            <div>
              <p className="text-2xl font-extrabold text-ink">{s.value}</p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* CONFIG */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="⚡"
              title="Système XP"
              description="Active ou désactive l’attribution d’expérience."
              action={<Switch checked label="Activer le système XP" />}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="XP gagné par message" htmlFor="xp-msg" hint="Entre 1 et 100.">
                <Input id="xp-msg" type="number" defaultValue={15} min={1} max={100} />
              </Field>
              <Field label="Cooldown XP (secondes)" htmlFor="xp-cd" hint="Temps entre deux gains d’XP.">
                <Input id="xp-cd" type="number" defaultValue={60} min={10} max={600} />
              </Field>
              <Field label="XP gagné par minute de vocal" htmlFor="xp-vc">
                <Input id="xp-vc" type="number" defaultValue={30} min={0} max={100} />
              </Field>
              <Field label="Salon des annonces de niveau" htmlFor="xp-channel">
                <Select id="xp-channel" defaultValue="#niveaux">
                  {channels.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Message de niveau
                  </p>
                  <p className="text-xs text-muted">
                    {"{user} a atteint le niveau {level} !"}
                  </p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Ignorer les salons
                  </p>
                  <p className="text-xs text-muted">
                    #bots, #annonces exclus du XP.
                  </p>
                </div>
                <Switch checked />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              icon="🏆"
              title="Récompenses de niveaux"
              description="Un rôle est automatiquement attribué à l’atteinte du niveau."
              action={
                <button
                  type="button"
                  className="h-9 rounded-xl bg-brand-600 px-3.5 text-xs font-semibold text-ink transition hover:bg-brand-500"
                >
                  + Ajouter
                </button>
              }
            />
            <ul className="space-y-2.5">
              {levelRewards.map((r) => (
                <li
                  key={r.level}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-3"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0e1c3f]/5 text-sm font-bold text-ink ring-1 ring-[#0e1c3f]/10">
                      {r.level}
                    </span>
                    <span
                      className="rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
                      style={{
                        color: r.color,
                        backgroundColor: `${r.color}1f`,
                        borderColor: `${r.color}55`,
                      }}
                    >
                      {r.role}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-xs text-muted">
                    Niveau {r.level}
                    <button
                      type="button"
                      className="text-muted transition hover:text-red-400"
                      aria-label={`Supprimer ${r.role}`}
                    >
                      ✕
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* LEADERBOARD */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="🥇"
              title="Classement des membres"
              description="Top 5 du serveur."
              action={<Badge tone="brand">Mise à jour auto</Badge>}
            />
            <ul className="space-y-2.5">
              {topMembers.map((m) => (
                <li
                  key={m.rank}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${
                    m.rank === 1
                      ? "border-amber-500/40 bg-amber-500/[0.07]"
                      : "border-[#0e1c3f]/10 bg-cream-2"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-bold ${
                        m.rank === 1
                          ? "bg-amber-100 text-amber-700"
                          : "bg-[#0e1c3f]/5 text-muted"
                      }`}
                    >
                      {m.rank}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400/70 to-brand-700/70 text-[11px] font-bold text-ink">
                      {m.avatar}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {m.name}
                      </span>
                      <span className="block text-[11px] text-muted">
                        {m.xp.toLocaleString("fr-FR")} XP
                      </span>
                    </span>
                  </span>
                  <Badge tone={m.rank === 1 ? "warning" : "brand"}>
                    Niv. {m.level}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              icon="📈"
              title="Progression XP"
              description="XP attribués sur les 7 derniers jours."
            />
            <div className="flex h-40 items-end gap-2">
              {[42, 58, 35, 71, 64, 88, 76].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-700 to-brand-400 transition-all duration-500 hover:from-brand-600 hover:to-brand-300"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted">
                    {["L", "M", "M", "J", "V", "S", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <SaveBar />
    </div>
  );
}
