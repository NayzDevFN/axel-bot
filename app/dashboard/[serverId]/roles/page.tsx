import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Select } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { Badge } from "@/components/ui/Badge";
import { servers, getServer, roleColors } from "@/lib/servers";

export const metadata = { title: "Rôles" };

const staffRoles = [
  { name: "Staff", members: 8, permissions: "Modération, logs" },
  { name: "VIP actif bg", members: 23, permissions: "Salon VIP, giveaways" },
];

const autoRoles = [
  { name: "Membre", delay: "Immédiat", on: true },
  { name: "Notifications", delay: "Après 5 min", on: false },
];

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function RolesPage({
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
          🎭 Rôles
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          Gère les rôles automatiques et le rôle attribué à l’équipe de support.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            icon="🤖"
            title="Rôle automatique"
            description="Attribué à chaque nouveau membre."
            action={<Switch checked label="Activé" />}
          />
          <Field label="Rôle à attribuer" htmlFor="auto-role" hint="Sélectionne un rôle existant sur le serveur.">
            <Select id="auto-role" defaultValue="Membre">
              <option>Membre</option>
              <option>VIP actif bg</option>
              <option>Staff</option>
              <option>— Aucun rôle —</option>
            </Select>
          </Field>

          <ul className="mt-5 space-y-2.5">
            {autoRoles.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full ring-2 ring-[#0e1c3f]/10"
                    style={{ backgroundColor: roleColors[r.name] ?? "#64748b" }}
                  />
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {r.name}
                    </span>
                    <span className="block text-[11px] text-muted">
                      {r.delay}
                    </span>
                  </span>
                </span>
                <Switch checked={r.on} />
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl border border-dashed border-[#0e1c3f]/10 bg-cream-2 p-4 text-center">
            <p className="text-xs text-muted">
              📡 La sélection directe des rôles depuis Discord sera disponible
              dès la connexion de l’API du bot.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="🛡️"
              title="Rôles Staff"
              description="Rôles reconnus par Axel Bot pour la modération et les tickets."
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
              {staffRoles.map((r) => (
                <li
                  key={r.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-3.5"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-3.5 w-3.5 rounded-full ring-2 ring-[#0e1c3f]/10"
                      style={{
                        backgroundColor: roleColors[r.name] ?? "#64748b",
                      }}
                    />
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {r.name}
                      </span>
                      <span className="block text-[11px] text-muted">
                        {r.permissions}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Badge tone="neutral">{r.members} membres</Badge>
                    <button
                      type="button"
                      className="text-muted transition hover:text-red-400"
                      aria-label={`Retirer ${r.name}`}
                    >
                      ✕
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              icon="🔑"
              title="Permissions liées"
              description="Ce que les rôles Staff peuvent faire."
            />
            <div className="grid gap-3">
              {[
                { t: "Utiliser les commandes de modération", on: true },
                { t: "Gérer et clôturer les tickets", on: true },
                { t: "Consulter tous les logs", on: true },
                { t: "Créer et terminer les giveaways", on: false },
                { t: "Accéder à la configuration du bot", on: false },
              ].map((p) => (
                <div
                  key={p.t}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-3"
                >
                  <span className="text-sm text-ink">{p.t}</span>
                  <Switch checked={p.on} />
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
