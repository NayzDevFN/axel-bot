import Link from "next/link";
import { Logo } from "@/components/ui/Layout";
import { HeaderLoginButton } from "@/components/auth/HeaderLoginButton";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#pourquoi", label: "Pourquoi Axel" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink px-4 py-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 lg:gap-6 xl:gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Logo size="sm" />
          <span className="font-display text-base font-bold tracking-[-0.02em] text-cream">
            Axel Bot
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden flex-1 items-center justify-center gap-5 xl:flex xl:gap-7"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-[13px] font-bold tracking-[-0.02em] text-cream/75 transition duration-300 hover:text-cream xl:text-base"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <HeaderLoginButton />
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-500 px-4 font-display text-[13px] font-black text-white shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5 hover:bg-brand-400 xl:px-5 xl:text-sm"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <nav
        aria-label="Navigation mobile"
        className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 xl:hidden"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-display text-[13px] font-bold tracking-[-0.02em] text-cream/75 transition hover:text-cream"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
