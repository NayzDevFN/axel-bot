import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  padded = true,
  hover = false,
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-[1.75rem] border border-[#0e1c3f]/10 bg-white/90 shadow-[0_18px_52px_rgba(0,0,0,0.07)] ${
        padded ? "p-5 sm:p-6" : ""
      } transition-all duration-300 ${
        hover
          ? "hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_20px_46px_rgba(0,0,0,0.12)]"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {icon ? (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-lg text-brand-600 ring-1 ring-brand-500/20">
            {icon}
          </span>
        ) : null}
        <div>
          <h2 className="font-display text-base font-bold text-ink sm:text-lg">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm text-muted">{description}</p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  );
}
