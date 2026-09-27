"use client";

import { useId, useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
}: SwitchProps) {
  const [enabled, setEnabled] = useState(checked);
  const id = useId();

  const toggle = () => {
    if (disabled) return;
    const next = !enabled;
    setEnabled(next);
    onChange?.(next);
  };

  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer select-none items-center gap-3"
    >
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={enabled}
        aria-label={label ?? "Activer ou désactiver"}
        disabled={disabled}
        onClick={toggle}
        className={`relative h-7 w-[52px] shrink-0 rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
          enabled
            ? "border-brand-500/50 bg-brand-500"
            : "border-[#0e1c3f]/15 bg-[#0e1c3f]/10"
        }`}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-md transition-all duration-300 ${
            enabled ? "left-[26px]" : "left-[3px]"
          }`}
        />
      </button>
      {label ? (
        <span className="text-sm font-semibold text-ink">{label}</span>
      ) : null}
      <span
        className={`hidden text-xs font-bold sm:inline ${
          enabled ? "text-brand-600" : "text-muted"
        }`}
      >
        {enabled ? "Activé" : "Désactivé"}
      </span>
    </label>
  );
}
