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
│   │   └── page.tsx              # 🔐 Connexion Discord (OAuth2 à venir)
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
│   ├── auth/LoginButton.tsx      # Bouton « Se connecter avec Discord »
│   └── dashboard/                # Topbar, sidebar serveur, giveaways
├── lib/
│   ├── servers.ts                # 📌 MOCK : serveurs, membres, giveaways…
│   └── content.ts                # 📌 MOCK : features, nav, stats
├── public/                       # Assets statiques (logo, icônes)
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## 🔌 Où brancher la connexion Discord OAuth2

Le point d’entrée est déjà en place :

1. **Interface** : `app/login/page.tsx` (page de connexion) +
   `components/auth/LoginButton.tsx`.
2. **Dans `components/auth/LoginButton.tsx`**, la fonction `connect()` contient
   ce TODO :

   ```ts
   // TODO OAuth2 : rediriger vers /api/auth/discord quand le client Discord sera configuré.
   ```

3. **À créer** :
   - `app/api/auth/discord/route.ts` → redirection vers
     `https://discord.com/oauth2/authorize?...` (scopes `identify guilds`).
   - `app/api/auth/callback/route.ts` → échange du `code` contre un jeton, puis
     création de la session.
   - Stockage de session : cookies signés / `next-auth` / librairie équivalente.

4. **Variables d’environnement** à ajouter dans `.env.local` :

   ```bash
   DISCORD_CLIENT_ID=
   DISCORD_CLIENT_SECRET=
   DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback/discord
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

Une fois l’OAuth2 branchée, remplacer la liste de serveurs mockée par la
réponse de `GET /users/@me/guilds` (filtrée sur les permissions *Administrateur*
/ *Gérer le serveur*).

---

## 🤖 Où ajouter l’API du bot

Le bot Discord n’est **pas encore développé**. Prévoir :

```
api/
├── bot/
│   ├── config/GET.ts        # lire la config d’un serveur
│   ├── config/PATCH.ts      # enregistrer une modification depuis le dashboard
│   └── ...
├── auth/…                   # OAuth2 (voir ci-dessus)
└── webhook/…                # événements Discord (optionnel)
```

Points de branchement dans le dashboard (aujourd’hui 100 % mock) :

| Page | Donnée mockée à remplacer |
|---|---|
| `dashboard/page.tsx` | `lib/servers.ts` → `servers` (liste des serveurs) |
| `dashboard/[serverId]/*/page.tsx` | valeurs `defaultValue` / `checked` des champs |
| `components/dashboard/GiveawaysManager.tsx` | `giveaways` + création locale |
| `components/ui/SaveBar.tsx` | `save()` → `PATCH /api/bot/config` |
| `components/auth/LoginButton.tsx` | redirection OAuth2 |

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
