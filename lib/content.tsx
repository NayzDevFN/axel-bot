import type { ReactNode } from "react";

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export function serverNav(serverId: string): NavItem[] {
  const base = `/dashboard/${serverId}`;
  return [
    { href: base, label: "Vue d’ensemble", icon: "🏠" },
    { href: `${base}/moderation`, label: "Modération", icon: "🛡️" },
    { href: `${base}/tickets`, label: "Tickets", icon: "🎫" },
    { href: `${base}/welcome`, label: "Bienvenue", icon: "👋" },
    { href: `${base}/levels`, label: "Niveaux", icon: "📈" },
    { href: `${base}/giveaways`, label: "Giveaways", icon: "🎉" },
    { href: `${base}/logs`, label: "Logs", icon: "📜" },
    { href: `${base}/roles`, label: "Rôles", icon: "🎭" },
    { href: `${base}/settings`, label: "Paramètres", icon: "⚙️" },
  ];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  href: string;
  tag: string;
}

export const features: Feature[] = [
  {
    icon: "🛡️",
    title: "Modération",
    description:
      "Anti-pub intelligent, avertissements, timeouts et sanctions automatiques avec logs complets.",
    href: "/dashboard/axel-community/moderation",
    tag: "Sécurité",
  },
  {
    icon: "🎫",
    title: "Tickets",
    description:
      "Un système de tickets élégant pour le support : catégories, rôles dédiés et historique.",
    href: "/dashboard/axel-community/tickets",
    tag: "Support",
  },
  {
    icon: "👋",
    title: "Bienvenue",
    description:
      "Messages d’accueil personnalisés, rôle automatique et image de bienvenue.",
    href: "/dashboard/axel-community/welcome",
    tag: "Engagement",
  },
  {
    icon: "📈",
    title: "Niveaux",
    description:
      "Système XP avec cooldown, classement des membres et récompenses de niveaux.",
    href: "/dashboard/axel-community/levels",
    tag: "Progression",
  },
  {
    icon: "🎉",
    title: "Giveaways",
    description:
      "Créez et gérez des tirages au sort : durée, gagnants, salon et résultats automatiques.",
    href: "/dashboard/axel-community/giveaways",
    tag: "Communauté",
  },
  {
    icon: "⚙️",
    title: "Configuration",
    description:
      "Rôles, logs, paramètres du serveur : tout se pilote depuis une interface unique.",
    href: "/dashboard/axel-community/settings",
    tag: "Contrôle",
  },
];

export const homeStats: { value: string; label: string }[] = [
  { value: "12 847", label: "Membres protégés" },
  { value: "99,9 %", label: "Uptime du bot" },
  { value: "34", label: "Fonctionnalités" },
  { value: "< 50 ms", label: "Temps de réponse" },
];

export function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-brand-300">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Icon({ children }: { children: ReactNode }) {
  return <span aria-hidden="true">{children}</span>;
}
