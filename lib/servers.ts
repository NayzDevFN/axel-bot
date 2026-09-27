export interface Server {
  id: string;
  name: string;
  icon: string;
  members: number;
  online: number;
  botPresent: boolean;
  owner?: boolean;
  boost?: string;
}

export const servers: Server[] = [
  {
    id: "axel-community",
    name: "Axel community’s",
    icon: "🏠",
    members: 12847,
    online: 1342,
    botPresent: true,
    owner: true,
    boost: "Niveau 2",
  },
  {
    id: "axel-gaming",
    name: "Axel Gaming Hub",
    icon: "🎮",
    members: 4210,
    online: 512,
    botPresent: true,
  },
  {
    id: "axel-studio",
    name: "Axel Studio",
    icon: "🎨",
    members: 986,
    online: 74,
    botPresent: false,
  },
];

export function getServer(id: string): Server | undefined {
  return servers.find((s) => s.id === id);
}

export const currentUser = {
  id: "discord-user-42",
  username: "axel.dev",
  displayName: "Axel",
  avatar: "Ax",
};

export const levelStats = {
  membersWithXp: 125,
  averageLevel: 8,
  totalMessages: 12458,
};

export const topMembers = [
  { rank: 1, name: "Axel", level: 42, xp: 184320, avatar: "AX" },
  { rank: 2, name: "Léa", level: 37, xp: 152980, avatar: "LE" },
  { rank: 3, name: "Noah", level: 31, xp: 121450, avatar: "NO" },
  { rank: 4, name: "Mika", level: 24, xp: 88740, avatar: "MI" },
  { rank: 5, name: "Sarah", level: 19, xp: 64210, avatar: "SA" },
];

export const levelRewards = [
  { level: 5, role: "Débutant", color: "#1d4ed8" },
  { level: 10, role: "Régulier", color: "#2563eb" },
  { level: 25, role: "Vétéran", color: "#1e40af" },
  { level: 50, role: "Légende", color: "#6d28d9" },
];

export interface Giveaway {
  id: string;
  prize: string;
  endsAt: string;
  remaining: string;
  winners: number;
  participants: number;
  channel: string;
  status: "active" | "ended";
}

export const giveaways: Giveaway[] = [
  {
    id: "gw-1",
    prize: "Giveaway Nitro",
    endsAt: "2026-10-03",
    remaining: "6 jours restants",
    winners: 2,
    participants: 54,
    channel: "#giveaways",
    status: "active",
  },
  {
    id: "gw-2",
    prize: "Carte cadeau 20€",
    endsAt: "2026-09-29",
    remaining: "2 jours restants",
    winners: 1,
    participants: 128,
    channel: "#events",
    status: "active",
  },
  {
    id: "gw-3",
    prize: "Rôle VIP exclusif",
    endsAt: "2026-09-24",
    remaining: "Terminé",
    winners: 3,
    participants: 217,
    channel: "#giveaways",
    status: "ended",
  },
];

export const channels = [
  "#bienvenue",
  "#général",
  "#logs",
  "#tickets",
  "#giveaways",
  "#niveaux",
  "#modération",
  "#events",
];

export const roles = [
  "Membre",
  "Staff",
  "Gérant",
  "VIP actif bg",
  "Admin",
  "Bot",
  "@everyone",
];

export const roleColors: Record<string, string> = {
  Membre: "#1d4ed8",
  Staff: "#047857",
  Gérant: "#b45309",
  "VIP actif bg": "#6d28d9",
  Admin: "#b91c1c",
  Bot: "#0369a1",
  "@everyone": "#475569",
};
