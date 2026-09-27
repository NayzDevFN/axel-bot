"use client";

import { useState } from "react";
import { Button } from "./Button";
import { ConfirmDialog } from "./Modal";

export function SaveBar({ note }: { note?: string }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const save = () => {
    setStatus("saving");
    window.setTimeout(() => {
      setStatus("saved");
      window.setTimeout(() => setStatus("idle"), 2200);
    }, 700);
  };

  return (
    <div className="sticky bottom-4 z-30 mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-[#0e1c3f]/10 bg-white/85 px-4 py-3 shadow-[0_18px_52px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:px-5">
        <p className="text-xs text-muted">
          {note ??
            "Les modifications sont enregistrées dans la config du serveur."}
        </p>
        <div className="flex items-center gap-3">
          {status === "saved" ? (
            <span className="text-xs font-bold text-brand-600">
              ✓ Modifications enregistrées
            </span>
          ) : null}
          <Button
            size="sm"
            onClick={save}
            disabled={status === "saving"}
            variant="secondary"
          >
            {status === "saving" ? "Enregistrement…" : "Annuler"}
          </Button>
          <Button size="sm" onClick={save} disabled={status === "saving"}>
            {status === "saving" ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DangerZone({
  title,
  description,
  confirmTitle,
  confirmMessage,
  confirmLabel,
  actionLabel,
}: {
  title: string;
  description: string;
  confirmTitle: string;
  confirmMessage: string;
  confirmLabel: string;
  actionLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.75rem] border border-red-200 bg-red-50/70 p-5 shadow-[0_18px_52px_rgba(0,0,0,0.06)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-bold text-red-600">
            {title}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted">{description}</p>
        </div>
        <Button variant="danger" size="sm" onClick={() => setOpen(true)}>
          {actionLabel}
        </Button>
      </div>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => undefined}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel={confirmLabel}
      />
    </div>
  );
}
