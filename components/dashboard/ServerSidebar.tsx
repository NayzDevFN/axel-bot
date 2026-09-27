"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { serverNav } from "@/lib/content";

export function ServerSidebar({
  serverId,
  serverName,
  serverIcon,
}: {
  serverId: string;
  serverName: string;
  serverIcon: string;
}) {
  const pathname = usePathname();
  const items = serverNav(serverId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Déclencheur mobile */}
      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 items-center gap-2 rounded-full border border-[#0e1c3f]/12 bg-white px-4 font-display text-sm font-bold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5"
          aria-expanded={open}
        >
          <span className="grid gap-[3px]">
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
          </span>
          Menu du serveur
        </button>
        <span className="truncate font-display text-sm font-bold text-ink">
          {serverIcon} {serverName}
        </span>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } mb-6 lg:sticky lg:top-24 lg:mb-0 lg:block lg:h-fit`}
      >
        <div className="overflow-hidden rounded-[1.75rem] bg-ink p-3 text-cream shadow-[0_22px_56px_rgba(0,0,0,0.18)]">
          <div className="border-b border-cream/10 p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream/10 text-xl ring-1 ring-cream/15">
                {serverIcon}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-cream">
                  {serverName}
                </p>
                <p className="truncate text-[11px] text-cream/55">
                  Configuration du bot
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-3 flex flex-col gap-1 p-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-full px-3 py-2.5 font-display text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-brand-500 text-white shadow-[0_10px_24px_-14px_rgba(37,99,235,1)]"
                      : "text-cream/70 hover:bg-cream/8 hover:text-cream"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-xl text-sm transition ${
                      active ? "bg-white/20" : "bg-cream/8 group-hover:bg-cream/15"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 border-t border-cream/10 p-1 pt-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full px-3 py-2.5 text-xs font-bold text-cream/60 transition hover:bg-cream/8 hover:text-cream"
            >
              ← Changer de serveur
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
