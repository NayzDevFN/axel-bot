import type { ReactNode } from "react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box =
    size === "lg"
      ? "h-14 w-14 text-2xl"
      : size === "sm"
        ? "h-9 w-9 text-base"
        : "h-11 w-11 text-lg";

  return (
    <span
      className={`${box} grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 font-black text-white shadow-[0_10px_28px_-10px_rgba(37,99,235,0.75)] ring-1 ring-white/20`}
      aria-hidden="true"
    >
      A
    </span>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-cream/70 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-[#0e1c3f]/20 bg-white/85 px-6 py-14 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cream-2 text-2xl ring-1 ring-[#0e1c3f]/10">
        {icon}
      </span>
      <h3 className="font-display text-base font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
