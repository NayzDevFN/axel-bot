import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Select, Textarea } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { servers, getServer, channels } from "@/lib/servers";

export const metadata = { title: "Bienvenue" };

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function WelcomePage({
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
          👋 Bienvenue
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          Message d’accueil, salon dédié et rôle automatique pour chaque nouveau
          membre.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* CONFIG */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="👋"
              title="Message de bienvenue"
              description="Envoyé dès qu’un membre rejoint le serveur."
              action={<Switch checked label="Activé" />}
            />

            <div className="space-y-5">
              <Field
                label="Message"
                htmlFor="welcome-msg"
                hint="Variables disponibles : {user}, {server}, {memberCount}"
              >
                <Textarea
                  id="welcome-msg"
                  rows={4}
                  defaultValue={`Bienvenue dans ${server.name}, éclate toi !`}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Salon" htmlFor="welcome-channel">
                  <Select id="welcome-channel" defaultValue="#bienvenue">
                    {channels.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </Field>

                <Field label="Rôle automatique" htmlFor="welcome-role">
                  <Select id="welcome-role" defaultValue="Membre">
                    <option>Membre</option>
                    <option>VIP actif bg</option>
                    <option>Staff</option>
                    <option>— Aucun rôle —</option>
                  </Select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Image de bienvenue
                    </p>
                    <p className="text-xs text-muted">
                      Génère une bannière avec le pseudo.
                    </p>
                  </div>
                  <Switch checked />
                </div>
                <div className="flex items-start justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      DM de bienvenue
                    </p>
                    <p className="text-xs text-muted">
                      Message privé envoyé au membre.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              icon="💌"
              title="Message de départ"
              description="Envoyé quand un membre quitte le serveur."
              action={<Switch checked label="Activé" />}
            />
            <Field label="Message" htmlFor="leave-msg">
              <Textarea
                id="leave-msg"
                rows={3}
                defaultValue={`À bientôt sur ${server.name}, {user} !`}
              />
            </Field>
            <div className="mt-4">
              <Field label="Salon" htmlFor="leave-channel">
                <Select id="leave-channel" defaultValue="#bienvenue">
                  {channels.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
            </div>
          </Card>
        </div>

        {/* PREVIEW */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              icon="👁️"
              title="Aperçu du message"
              description="Rendu réel dans Discord."
            />

            <div className="rounded-2xl border border-white/10 bg-[#313338] p-5 shadow-[0_18px_52px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="text-white/50">#</span>
                <span className="text-sm font-semibold text-white">
                  bienvenue
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
                  <div className="mt-1.5 rounded-lg border-l-4 border-brand-500 bg-[#2b2d31] px-4 py-3">
                    <p className="text-sm text-white">
                      👋 Bienvenue{" "}
                      <span className="font-semibold text-brand-300">
                        @Nouveau
                      </span>
                      , bien joué !
                    </p>
                    <p className="mt-1 text-sm text-white">
                      Bienvenue dans{" "}
                      <span className="font-semibold text-brand-300">
                        {server.name}
                      </span>
                      , éclate toi !
                    </p>
                    <p className="mt-2 text-xs text-white/55">
                      Tu es le membre n°{" "}
                      <span className="font-semibold text-white">12 848</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-500/25">
                📨 #bienvenue
              </span>
              <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/25">
                🏷️ Rôle : Membre
              </span>
            </div>
          </Card>

          <Card>
            <CardHeader
              icon="📊"
              title="Statistiques d’accueil"
              description="30 derniers jours."
            />
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "412", l: "Welcomes" },
                { v: "18", l: "Départs" },
                { v: "96 %", l: "Rôle auto" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-[#0e1c3f]/10 bg-cream-2 p-4 text-center"
                >
                  <p className="text-xl font-extrabold text-ink">{s.v}</p>
                  <p className="mt-1 text-[11px] text-muted">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Derniers arrivants
              </p>
              <ul className="space-y-2.5">
                {[
                  { n: "Emma", t: "il y a 4 min" },
                  { n: "Hugo", t: "il y a 22 min" },
                  { n: "Chloé", t: "il y a 1 h" },
                ].map((m) => (
                  <li
                    key={m.n}
                    className="flex items-center justify-between rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-2.5"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-ink">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0e1c3f]/8 text-[10px] font-bold text-ink">
                        {m.n.slice(0, 2).toUpperCase()}
                      </span>
                      {m.n}
                    </span>
                    <span className="text-xs text-muted">{m.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>

      <SaveBar />
    </div>
  );
}
