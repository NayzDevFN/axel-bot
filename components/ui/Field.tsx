import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-bold text-ink"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}

const controlClass =
  "w-full rounded-full border border-[#0e1c3f]/12 bg-white px-5 py-3 text-sm text-ink placeholder:text-muted/70 transition-all duration-200 hover:border-[#0e1c3f]/25 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12";

export function Input({
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${controlClass} ${className}`} {...rest} />;
}

export function Textarea({
  className = "",
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${controlClass} rounded-[1.5rem] resize-y ${className}`}
      {...rest}
    />
  );
}

export function Select({
  className = "",
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={`${controlClass} appearance-none pr-10 ${className}`}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export interface Choice {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export function RadioCards({
  name,
  choices,
  defaultValue,
  columns = 3,
}: {
  name: string;
  choices: Choice[];
  defaultValue?: string;
  columns?: 1 | 2 | 3;
}) {
  const grid =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";

  return (
    <div className={`grid gap-3 ${grid}`} role="radiogroup" aria-label={name}>
      {choices.map((choice, i) => (
        <label key={choice.value} className="group relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={choice.value}
            defaultChecked={
              defaultValue ? choice.value === defaultValue : i === 0
            }
            className="peer sr-only"
          />
          <div className="flex h-full flex-col gap-1 rounded-[1.35rem] border border-[#0e1c3f]/10 bg-white/70 p-4 transition-all duration-200 peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] hover:border-[#0e1c3f]/25 hover:bg-white">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              {choice.icon ? <span>{choice.icon}</span> : null}
              {choice.label}
            </div>
            {choice.description ? (
              <p className="text-xs leading-relaxed text-muted">
                {choice.description}
              </p>
            ) : null}
          </div>
        </label>
      ))}
    </div>
  );
}
