import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { Badge } from "@/components/ui/Badge";
import { servers, getServer, channels, roleColors } from "@/lib/servers";

export const metadata = { title: "Tickets" };

const colors = [
  { name: "Bleu", hex: "#2563eb" },
  { name: "Vert", hex: "#10b981" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Rose", hex: "#ec4899" },
  { name: "Orange", hex: "#f59e0b" },
  { name: "Gris", hex: "#64748b" },
];

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function TicketsPage({
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
            🎫 Tickets
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-cream/70">
            Système de support privé : bouton d’ouverture, catégorie, rôles
            gérants et historique.
          </p>
        </div>
        <Badge tone="success" dot>
          Système de tickets : Activé
        </Badge>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* CONFIG */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="🎫"
              title="Système de tickets"
              description="Active ou désactive l’ensemble du module."
              action={<Switch checked label="Activé" />}
            />

            <div className="space-y-5">
              <Field label="Catégorie des tickets" htmlFor="cat" hint="Les salons de tickets seront créés dans cette catégorie.">
                <Select id="cat" defaultValue="Tickets">
                  <option>Tickets</option>
                  <option>Support</option>
                  <option>Administration</option>
                  <option>— Aucune catégorie —</option>
                </Select>
              </Field>

              <Field label="Rôle pouvant gérer les tickets" htmlFor="role" hint="Ce rôle accède à tous les salons de tickets.">
                <Select id="role" defaultValue="Gérant">
                  <option>Gérant</option>
                  <option>Staff</option>
                  <option>Admin</option>
                  <option>VIP actif bg</option>
                </Select>
              </Field>

              <Field label="Salon des logs" htmlFor="tlog">
                <Select id="tlog" defaultValue="#logs">
                  {channels.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>

              <Field label="Message du ticket" htmlFor="msg" hint="Affiché dans le salon de support.">
                <Textarea
                  id="msg"
                  rows={4}
                  defaultValue="Besoin d'aide ? Clique sur le bouton ci-dessous pour créer un ticket."
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Texte du bouton" htmlFor="btn">
                  <Input id="btn" defaultValue="🎫 Créer un ticket" />
                </Field>
                <Field label="Couleur du bouton" htmlFor="color">
                  <Select id="color" defaultValue="Bleu">
                    {colors.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </Select>
                </Field>
              </div>

              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <span
                    key={c.name}
                    className="h-8 w-8 rounded-lg ring-2 ring-offset-2 ring-offset-ink-900 transition"
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: c.name === "Bleu" ? `0 0 0 2px ${c.hex}` : undefined,
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              icon="⚙️"
              title="Options avancées"
              description="Comportement du système de tickets."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { t: "Transcription du ticket", d: "Envoyer un résumé en fin de ticket.", on: true },
                { t: "Message de fermeture", d: "Confirmer la clôture côté membre.", on: true },
                { t: "Ticket unique par membre", d: "Empêche les ouvertures multiples.", on: false },
                { t: "Question d’ouverture", d: "Demander un motif avant création.", on: true },
              ].map((o) => (
                <div
                  key={o.t}
                  className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{o.t}</p>
                    <p className="mt-0.5 text-xs text-muted">{o.d}</p>
                  </div>
                  <Switch checked={o.on} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* PREVIEW */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="👁️"
              title="Aperçu"
              description="Voici ce que verront les membres."
            />
            <div className="rounded-2xl border border-white/10 bg-[#2b2d31] p-5 shadow-[0_18px_52px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#5865F2]" />
                <span className="text-sm font-semibold text-white">
                  #support
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white">
                  AB
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Axel Bot{" "}
                    <span className="ml-1 rounded bg-[#5865F2] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      APP
                    </span>
                    <span className="ml-2 text-[11px] font-normal text-white/50">
                      Aujourd’hui à 14:00
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    Besoin d&apos;aide ? Clique sur le bouton ci-dessous pour
                    créer un ticket.
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg bg-[#2563eb] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1d4ed8]"
                  >
                    🎫 Créer un ticket
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                <p className="text-xs text-muted">Rôle support</p>
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: roleColors["Gérant"] }}
                >
                  Gérant
                </p>
              </div>
              <div className="rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                <p className="text-xs text-muted">Catégorie</p>
                <p className="mt-1 text-sm font-semibold text-ink">Tickets</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              icon="🗂️"
              title="Tickets récents"
              description="Les 5 derniers tickets du serveur."
            />
            <div className="space-y-2.5">
              {[
                { id: "#1042", user: "Noah", state: "Ouvert", tone: "success" as const },
                { id: "#1041", user: "Léa", state: "Ouvert", tone: "success" as const },
                { id: "#1040", user: "Mika", state: "Fermé", tone: "neutral" as const },
                { id: "#1039", user: "Sarah", state: "Fermé", tone: "neutral" as const },
                { id: "#1038", user: "Axel", state: "En attente", tone: "warning" as const },
              ].map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-brand-600">
                      🎫 {t.id}
                    </span>
                    <span className="text-sm text-ink">{t.user}</span>
                  </div>
                  <Badge tone={t.tone}>{t.state}</Badge>
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
