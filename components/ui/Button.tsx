import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "success";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-[0_10px_30px_-12px_rgba(37,99,235,0.85)] hover:bg-brand-600 hover:-translate-y-0.5",
  secondary:
    "bg-white text-ink border border-[#0e1c3f]/12 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]",
  ghost: "text-muted hover:bg-[#0e1c3f]/6 hover:text-ink",
  outline:
    "border border-brand-500/40 text-brand-700 bg-white/85 hover:bg-brand-50 hover:border-brand-500",
  danger:
    "bg-white text-red-600 border border-red-200 hover:bg-red-50",
  success:
    "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, className = "", children, ...rest },
    ref,
  ) => {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={cls} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
