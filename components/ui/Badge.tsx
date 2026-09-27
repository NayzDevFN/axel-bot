import type { HTMLAttributes, ReactNode } from "react";

type Tone =
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "purple";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-500/25",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-500/25",
  warning: "bg-amber-50 text-amber-700 ring-amber-500/25",
  danger: "bg-red-50 text-red-600 ring-red-500/25",
  neutral: "bg-[#0e1c3f]/6 text-ink ring-[#0e1c3f]/10",
  purple: "bg-violet-50 text-violet-700 ring-violet-500/25",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
}

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className = "",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${tones[tone]} ${className}`}
      {...rest}
    >
      {dot ? (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
