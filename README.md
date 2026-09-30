# Axel Bot — Dashboard

Site web / dashboard du bot Discord **Axel Bot** (serveur **Axel community’s**).

> ⚠️ **Étape 1 uniquement** : le site est entièrement construit et navigable, mais
> **aucune fonctionnalité Discord réelle n’est connectée**. Toutes les données
> affichées sont des **données de démonstration (mock)**.

---

## 🧱 Stack technique

| Élément | Choix |
|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** |
| Langage | **TypeScript** (strict) |
| Styles | **Tailwind CSS v4** (design tokens dans `app/globals.css`) |
| Lint | **ESLint** (`eslint-config-next`) |
| Données | Fichiers mock dans `lib/` (remplaçables par une base de données) |

---

## 🚀 Installation

Prérequis : **Node.js ≥ 20**.

```bash
npm install
```

### Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

### Lancer l’API du bot (état en ligne)

```bash
npm run bot:api
```

Ouvre [http://localhost:8787/api/bot/status](http://localhost:8787/api/bot/status).
Requiert `DISCORD_BOT_TOKEN` dans `.env.local` (cf. `.env.example`).

### Build de production

```bash
npm run build
npm run start
```

### Vérifications

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
```

---

## 📁 Structure du projet

```
.
├── app/                          # Routes (App Router)
│   ├── layout.tsx                # Layout global (langue fr, métadonnées)
│   ├── globals.css               # Design system (thème, animations, utilitaires)
│   ├── page.tsx                  # 🏠 Accueil
│   ├── not-found.tsx             # Page 404
│   ├── login/
│   │   └── page.tsx              # 🔐 Connexion par code d’accès
│   └── dashboard/
│       ├── layout.tsx            # Topbar du dashboard
│       ├── page.tsx              # 📊 Sélection du serveur
│       └── [serverId]/
│           ├── layout.tsx        # Sidebar de configuration
│           ├── page.tsx          # 🏠 Vue d’ensemble
│           ├── moderation/       # 🛡️ Modération (anti-pub…)
│           ├── tickets/          # 🎫 Tickets
│           ├── welcome/          # 👋 Bienvenue
│           ├── levels/           # 📈 Niveaux
│           ├── giveaways/        # 🎉 Giveaways
│           ├── logs/             # 📜 Logs
│           ├── roles/            # 🎭 Rôles
│           └── settings/         # ⚙️ Paramètres
├── components/
│   ├── ui/                       # Composants réutilisables
│   │   ├── Button.tsx            # Boutons (variants primary/secondary/…)
│   │   ├── Card.tsx              # Cartes + en-tête de carte
│   │   ├── Switch.tsx            # Interrupteur ON/OFF
│   │   ├── Badge.tsx             # Pastilles d’état
│   │   ├── Field.tsx             # Input / Textarea / Select / RadioCards
│   │   ├── Modal.tsx             # Modale + ConfirmDialog
│   │   ├── SaveBar.tsx           # Barre d’enregistrement + DangerZone
│   │   └── Layout.tsx            # Logo / PageHeading / EmptyState
│   ├── home/                     # Header & footer du site vitrine
│   ├── auth/                    # AuthGuard, formulaire de code, header
│   ├── bot/                      # État du bot + bouton d’invitation
│   └── dashboard/                # Topbar, sidebar serveur, giveaways
├── lib/
│   ├── database.ts              # 🗄️ Base : codes d’accès + historique
│   ├── auth.ts                  # 🔐 Session (localStorage, 7 jours)
│   ├── servers.ts                # 📌 MOCK : serveurs, membres, giveaways…
│   └── content.ts                # 📌 MOCK : features, nav, stats
├── public/                       # Assets statiques (logo, icônes)
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## 🔐 Connexion par code d’accès

Plus aucune connexion Discord OAuth2 : l’accès au dashboard se fait avec un
**code d’accès** unique, vérifié par la base de données du projet.

| Élément | Fichier |
|---|---|
| Base de données (codes + historique des connexions) | `lib/database.ts` |
| Vérification du code | `lib/database.ts` → `verifyAccessCode()` |
| Session (7 jours, localStorage) | `lib/auth.ts` |
| Formulaire de connexion | `components/auth/CodeLoginForm.tsx` sur `/login` |
| Protection du dashboard | `components/auth/AuthGuard.tsx` |

**Code d’accès Owner** : défini dans `lib/database.ts` (table `accessCodes`),
rôle `Owner`, seul code actif par défaut. Ajoute d’autres entrées dans cette
table pour créer d’autres comptes (`role`, `active`).

Le site est un export statique : la base est stockée dans le `localStorage`
du navigateur sous la clé `axelbot.database`. Elle garde les codes valides et
les **200 dernières tentatives de connexion** (horodatage, code saisi,
succès/échec). Helpers disponibles : `getLoginHistory()`,
`clearLoginHistory()`, `resetDatabase()`.

---

## 🤖 API du bot (état en ligne + invitation)

Le site est statique : **le token du bot ne doit jamais entrer dans le bundle
client**. Il est lu uniquement par `scripts/bot-api.mjs`, côté serveur.

```bash
npm run bot:api          # ou double-clic sur « Lancer l'API du bot.bat »
```

- Fichier secret : `.env.local` (ignoré par git, modèle dans `.env.example`)
- `GET http://localhost:8787/api/bot/status` → `{ online, username, guildCount }`
- `GET http://localhost:8787/api/bot/guilds` → serveurs où le bot est présent
- Le site lit l'état via `NEXT_PUBLIC_BOT_API_URL` (`lib/bot.ts`), avec repli
  « Bot non connecté » si l'API est éteinte.

**Invitation du bot** : bouton « Inviter le bot » sur `/login` et dans la
topbar du dashboard → `components/bot/InviteBotButton.tsx`
(`https://discord.com/oauth2/authorize?client_id=1554188804309655562&permissions=8&integration_type=0&scope=bot`).

> ⚠️ Un token Discord ne se partage **jamais** (chat, repo, image). S'il a été
> affiché quelque part, régénère-le dans Developer Portal → Bot → Reset Token.

### Pour aller plus loin (bot réellement connecté)

Le bot lui-même n'est pas encore développé. Prévoir :

```
api/
├── bot/
│   ├── config/GET.ts        # lire la config d’un serveur
│   ├── config/PATCH.ts      # enregistrer une modification depuis le dashboard
│   └── ...
├── auth/…                   # Code d’accès (voir ci-dessus)
└── webhook/…                # événements Discord (optionnel)
```

Points de branchement dans le dashboard (aujourd’hui 100 % mock) :

| Page | Donnée mockée à remplacer |
|---|---|
| `dashboard/page.tsx` | `lib/servers.ts` → `servers` (liste des serveurs) |
| `dashboard/[serverId]/*/page.tsx` | valeurs `defaultValue` / `checked` des champs |
| `components/dashboard/GiveawaysManager.tsx` | `giveaways` + création locale |
| `components/ui/SaveBar.tsx` | `save()` → `PATCH /api/bot/config` |

**Recommandation architecture** : le dashboard écrit dans une base de données
(PostgreSQL/Prisma ou SQLite), le bot lit cette configuration au démarrage et
la recharge à chaque modification (event, cache ou polling).

---

## 🎨 Design

Style inspiré de **looters.fr** :

- **Thème clair** : fond crème `#f7f6f2`, encre `#101916`, texte secondaire `#527266`.
- **Couleur principale : BLEU** (`--color-brand-*`, base `#2563eb`) — boutons, liens,
  badges et item actif de la sidebar.
- **Police** : *Space Grotesk* (titres, nav, boutons) via `next/font/google`,
  corps de texte en police système.
- **Formes** : cartes `rounded-[1.75rem]`, boutons `rounded-full`, ombres douces
  `0 18px 52px rgba(16,25,22,.07)`.
- **Panneaux sombres** (`#101916`) : sidebar du dashboard, footer, blocs CTA de
  l'accueil et panneau de connexion — comme les blocs noirs de Looters.
- **Préviews Discord** (tickets / bienvenue) volontairement sombres, fidèles à Discord.
- Animations légères (`fade-up`, `float`, `pulse-soft`), responsive mobile/tablette/PC.

Tokens et utilitaires (`surface`, `panel-dark`, `grid-bg`, `text-gradient`)
définis dans `app/globals.css`.

---

## 🗺️ Routes disponibles

| Route | Page |
|---|---|
| `/` | Accueil |
| `/login` | Connexion Discord |
| `/dashboard` | Mes serveurs |
| `/dashboard/axel-community` | Vue d’ensemble |
| `/dashboard/axel-community/moderation` | 🛡️ Modération |
| `/dashboard/axel-community/tickets` | 🎫 Tickets |
| `/dashboard/axel-community/welcome` | 👋 Bienvenue |
| `/dashboard/axel-community/levels` | 📈 Niveaux |
| `/dashboard/axel-community/giveaways` | 🎉 Giveaways |
| `/dashboard/axel-community/logs` | 📜 Logs |
| `/dashboard/axel-community/roles` | 🎭 Rôles |
| `/dashboard/axel-community/settings` | ⚙️ Paramètres |

> Les routes fonctionnent aussi avec `axel-gaming` et `axel-studio`
> (voir `lib/servers.ts`).
