"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select } from "@/components/ui/Field";
import { giveaways as initialGiveaways, channels, type Giveaway } from "@/lib/servers";

export function GiveawaysManager() {
  const [list, setList] = useState<Giveaway[]>(initialGiveaways);
  const [open, setOpen] = useState(false);
  const [ended, setEnded] = useState<string | null>(null);

  const finish = (id: string) => {
    setEnded(id);
    window.setTimeout(() => setEnded(null), 2500);
  };

  const create = () => {
    setList((prev) => [
      {
        id: `gw-${Date.now()}`,
        prize: (document.getElementById("gw-prize") as HTMLInputElement)?.value || "Nouveau giveaway",
        endsAt: "2026-10-10",
        remaining: "7 jours restants",
        winners: Number(
          (document.getElementById("gw-winners") as HTMLInputElement)?.value || 2,
        ),
        participants: 0,
        channel:
          (document.getElementById("gw-channel") as HTMLSelectElement)?.value ??
          "#giveaways",
        status: "active",
      },
      ...prev,
    ]);
    setOpen(false);
  };

  const active = list.filter((g) => g.status === "active");
  const done = list.filter((g) => g.status === "ended");

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge>{active.length} actifs</Badge>
          <Badge>{done.length} terminés</Badge>
        </div>
        <Button onClick={() => setOpen(true)}>+ Créer un giveaway</Button>
      </div>

      {active.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#0e1c3f]/10 bg-cream-2 p-12 text-center">
          <p className="text-3xl">🎉</p>
          <p className="mt-3 text-sm font-semibold text-ink">
            Aucun giveaway en cours
          </p>
          <p className="mt-1 text-xs text-muted">
            Crée ton premier tirage au sort pour animer la communauté.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {active.map((g) => (
            <div
              key={g.id}
              className="group rounded-[1.75rem] border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-white to-white p-5 shadow-[0_18px_52px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-[0_20px_46px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-ink">🎁 {g.prize}</p>
                  <p className="mt-1 text-xs text-muted">
                    {g.channel} · se termine le {g.endsAt}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-500/25">
                  En cours
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold text-amber-600">
                ⏱️ {g.remaining}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-lg bg-[#0e1c3f]/5 px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-[#0e1c3f]/10">
                  🏆 {g.winners} gagnant{g.winners > 1 ? "s" : ""}
                </span>
                <span className="rounded-lg bg-[#0e1c3f]/5 px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-[#0e1c3f]/10">
                  🎉 {g.participants} participants
                </span>
              </div>

              <div className="mt-5 flex gap-2">
                <Button size="sm" variant="secondary">
                  Gérer
                </Button>
                <Button size="sm" variant="outline" onClick={() => finish(g.id)}>
                  {ended === g.id ? "✓ Terminé" : "Terminer"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {done.length > 0 ? (
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Giveaways terminés
          </h3>
          <div className="space-y-2.5">
            {done.map((g) => (
              <div
                key={g.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#0e1c3f]/10 bg-cream-2 px-4 py-3"
              >
                <span className="text-sm text-ink">
                  🎁 <strong className="text-ink">{g.prize}</strong> —{" "}
                  {g.participants} participants · {g.winners} gagnant(s)
                </span>
                <span className="rounded-full bg-[#0e1c3f]/5 px-2.5 py-1 text-[11px] font-bold text-muted ring-1 ring-[#0e1c3f]/10">
                  Terminé
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Créer un giveaway"
        description="Définis la récompense, la durée et le salon."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={create}>Créer le giveaway</Button>
          </>
        }
      >
        <Field label="Récompense" htmlFor="gw-prize">
          <Input id="gw-prize" placeholder="Ex : Giveaway Nitro" defaultValue="Giveaway Nitro" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Durée" htmlFor="gw-duration">
            <Select id="gw-duration" defaultValue="7 jours">
              <option>1 heure</option>
              <option>1 jour</option>
              <option>3 jours</option>
              <option>7 jours</option>
              <option>14 jours</option>
            </Select>
          </Field>
          <Field label="Nombre de gagnants" htmlFor="gw-winners">
            <Input id="gw-winners" type="number" min={1} max={20} defaultValue={2} />
          </Field>
        </div>
        <Field label="Salon" htmlFor="gw-channel">
          <Select id="gw-channel" defaultValue="#giveaways">
            {channels.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
      </Modal>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0e1c3f]/5 px-3 py-1 text-xs font-semibold text-ink ring-1 ring-[#0e1c3f]/10">
      {children}
    </span>
  );
}
