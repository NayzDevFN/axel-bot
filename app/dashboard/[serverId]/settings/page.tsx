import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Input, RadioCards, Select } from "@/components/ui/Field";
import { SaveBar, DangerZone } from "@/components/ui/SaveBar";
import { Badge } from "@/components/ui/Badge";
import { servers, getServer } from "@/lib/servers";

export const metadata = { title: "Paramètres" };

const accents = [
  { value: "bleu", label: "Bleu", icon: "🔵" },
  { value: "indigo", label: "Indigo", icon: "🟣" },
  { value: "cyan", label: "Cyan", icon: "🩵" },
  { value: "vert", label: "Vert", icon: "🟢" },
  { value: "rose", label: "Rose", icon: "🩷" },
  { value: "noir", label: "Noir", icon: "⚫" },
];

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const server = getServer(serverId);
  if (!server) notFound();

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
          Module
        </p>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
          ⚙️ Paramètres
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          Informations du serveur et préférences générales d’Axel Bot.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Informations serveur */}
        <Card>
          <CardHeader
            icon="🏠"
            title="Informations du serveur"
            action={<Badge tone="success" dot>Bot connecté</Badge>}
          />
          <div className="flex items-center gap-4 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-brand-800/30 text-2xl ring-1 ring-brand-500/30">
              {server.icon}
            </span>
            <div>
              <p className="text-base font-semibold text-ink">{server.name}</p>
              <p className="text-xs text-muted">
                {server.members.toLocaleString("fr-FR")} membres ·{" "}
                {server.boost ?? "Pas de boost"}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <Field label="Nom du serveur" htmlFor="srv-name">
              <Input id="srv-name" defaultValue={server.name} />
            </Field>
            <Field
              label="ID du serveur"
              htmlFor="srv-id"
              hint="Identifiant Discord unique, utilisé pour l’API du bot."
            >
              <Input id="srv-id" defaultValue={server.id} readOnly className="font-mono text-xs" />
            </Field>
            <Field label="Préfixe du bot" htmlFor="prefix" hint="Commandes texte (le bot utilisera surtout des slash commands).">
              <Input id="prefix" defaultValue="!" />
            </Field>
          </div>
        </Card>

        {/* Préférences */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="🌍"
              title="Préférences générales"
              description="Langue et apparence du bot."
            />
            <div className="space-y-5">
              <Field label="Langue" htmlFor="lang">
                <Select id="lang" defaultValue="Français">
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                  <option>Deutsch</option>
                </Select>
              </Field>

              <div>
                <p className="mb-3 text-sm font-medium text-ink">
                  Couleur du bot
                </p>
                <RadioCards name="bot-color" defaultValue="bleu" choices={accents} columns={3} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Messages privés
                    </p>
                    <p className="text-xs text-muted">
                      Le bot peut envoyer des DM.
                    </p>
                  </div>
                  <Switch checked />
                </div>
                <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Mode maintenance
                    </p>
                    <p className="text-xs text-muted">
                      Suspend toutes les réponses.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader icon="🧬" title="État de la configuration" />
            <dl className="space-y-3 text-sm">
              {[
                ["Modules actifs", "6 / 6"],
                ["Dernière sauvegarde", "Il y a 12 minutes"],
                ["Version de la config", "v3"],
                ["Permissions du bot", "Administrateur"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-3 border-b border-[#0e1c3f]/8 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <DangerZone
          title="Zone dangereuse"
          description="Ces actions sont irréversibles. Une confirmation est demandée avant toute exécution."
          confirmTitle="Réinitialiser la configuration ?"
          confirmMessage="Toute la configuration d’Axel Bot sur ce serveur sera supprimée et remplacée par les valeurs par défaut. Cette action est irréversible."
          confirmLabel="Oui, tout réinitialiser"
          actionLabel="Réinitialiser la configuration"
        />
      </div>

      <SaveBar />
    </div>
  );
}
