import { notFound } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Field, Select } from "@/components/ui/Field";
import { SaveBar } from "@/components/ui/SaveBar";
import { GiveawaysManager } from "@/components/dashboard/GiveawaysManager";
import { servers, getServer, channels } from "@/lib/servers";

export const metadata = { title: "Giveaways" };

export function generateStaticParams() {
  return servers.map((s) => ({ serverId: s.id }));
}

export default async function GiveawaysPage({
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
          🎉 Giveaways
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          Crée des tirages au sort, suis les participants et désigne les
          gagnants automatiquement.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader
          icon="🎛️"
          title="Paramètres généraux"
          description="Réglages appliqués à tous les giveaways."
          action={<Switch checked label="Module activé" />}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Salon par défaut" htmlFor="gw-default">
            <Select id="gw-default" defaultValue="#giveaways">
              {channels.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Durée par défaut" htmlFor="gw-defdur">
            <Select id="gw-defdur" defaultValue="7 jours">
              <option>1 jour</option>
              <option>3 jours</option>
              <option>7 jours</option>
              <option>14 jours</option>
            </Select>
          </Field>
          <Field label="Gagnants par défaut" htmlFor="gw-defwin">
            <Select id="gw-defwin" defaultValue="2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>5</option>
            </Select>
          </Field>
        </div>
      </Card>

      <h2 className="mb-4 text-lg font-bold text-ink">Giveaways actifs</h2>
      <GiveawaysManager />

      <SaveBar />
    </div>
  );
}
