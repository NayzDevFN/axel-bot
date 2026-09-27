import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Input, RadioCards, Select } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { Badge } from "@/components/ui/Badge";
import { servers, getServer, channels } from "@/lib/servers";

export const metadata = { title: "Modération" };

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function ModerationPage({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  if (!getServer(serverId)) notFound();

  return (
    <div className="animate-fade-up">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            Module
          </p>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
            🛡️ Modération
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-cream/70">
            Configure la protection du serveur : anti-pub, sanctions et
            enregistrement des actions.
          </p>
        </div>
        <Badge tone="success" dot>
          Système actif
        </Badge>
      </div>

      {/* ANTI-PUB */}
      <Card>
        <CardHeader
          icon="🚫"
          title="Anti-pub"
          description="Détecte et traite automatiquement les invitations et liens de serveurs Discord."
          action={<Switch checked label="Activer l’anti-pub" />}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Salon des logs" htmlFor="mod-log-channel" hint="Les sanctions anti-pub seront envoyées ici.">
            <Select id="mod-log-channel" defaultValue="#modération">
              {channels.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>

          <Field label="Salons autorisés" htmlFor="mod-whitelist" hint="Laisse vide pour appliquer partout.">
            <Input id="mod-whitelist" placeholder="#annonces, #partenariats" />
          </Field>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-ink">
            Action à effectuer
          </p>
          <RadioCards
            name="anti-pub-action"
            defaultValue="delete"
            choices={[
              {
                value: "delete",
                label: "Supprimer le message",
                description: "Le message en publicitaire est retiré immédiatement.",
                icon: "🗑️",
              },
              {
                value: "warn",
                label: "Warn",
                description: "Avertissement envoyé en privé et journalisé.",
                icon: "⚠️",
              },
              {
                value: "timeout",
                label: "Timeout",
                description: "Membre mis en silencieux pendant 10 minutes.",
                icon: "🔇",
              },
            ]}
          />
        </div>

        <div className="mt-6 grid gap-4 border-t border-[#0e1c3f]/8 pt-6 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Invitations Discord</p>
              <p className="text-xs text-muted">Bloque les liens d’invitation.</p>
            </div>
            <Switch checked />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Liens externes</p>
              <p className="text-xs text-muted">Interdit les URL hors whitelist.</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Spam / flood</p>
              <p className="text-xs text-muted">Détection des rafales de messages.</p>
            </div>
            <Switch checked />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Mentions en masse</p>
              <p className="text-xs text-muted">Plus de 5 mentions = sanction.</p>
            </div>
            <Switch checked />
          </div>
        </div>
      </Card>

      {/* SANCTIONS */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            icon="🔨"
            title="Sanctions automatiques"
            description="Progression appliquée après récidive."
          />
          <div className="space-y-4">
            <Field label="1ʳᵉ infraction" htmlFor="s1">
              <Select id="s1" defaultValue="Warn">
                <option>Warn</option>
                <option>Timeout 5 min</option>
                <option>Aucune</option>
              </Select>
            </Field>
            <Field label="2ᵉ infraction" htmlFor="s2">
              <Select id="s2" defaultValue="Timeout 10 min">
                <option>Warn</option>
                <option>Timeout 10 min</option>
                <option>Timeout 1 h</option>
              </Select>
            </Field>
            <Field label="3ᵉ infraction" htmlFor="s3">
              <Select id="s3" defaultValue="Kick">
                <option>Timeout 1 h</option>
                <option>Kick</option>
                <option>Ban</option>
              </Select>
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader
            icon="📋"
            title="Rôle des modérateurs"
            description="Les membres avec ce rôle ignorent l’anti-pub."
          />
          <Field label="Rôle autorisé" htmlFor="mod-role">
            <Select id="mod-role" defaultValue="Staff">
              <option>Staff</option>
              <option>Gérant</option>
              <option>Admin</option>
              <option>VIP actif bg</option>
            </Select>
          </Field>

          <div className="mt-5 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
            <p className="text-xs font-semibold text-muted">Dernières sanctions</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="flex items-center justify-between gap-3">
                <span className="text-ink">@spammer — lien supprimé</span>
                <span className="text-muted">14:32</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-ink">@flooder — timeout 10 min</span>
                <span className="text-muted">Hier</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-ink">@troller — warn</span>
                <span className="text-muted">Hier</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <SaveBar note="La configuration anti-pub s’applique à l’ensemble du serveur." />
    </div>
  );
}
