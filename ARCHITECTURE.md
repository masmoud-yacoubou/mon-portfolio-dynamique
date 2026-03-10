# 📐 Architecture du Projet - Portfolio Dynamique

## 📋 Vue d'ensemble

Ce projet est un **portfolio personnel multilingue** construit avec **Next.js 16** et **Sanity CMS**. C'est une application moderne avec rendu côté serveur (SSR) et rendu côté client (CSR) hybride, optimisée pour le SEO et les performances.


## 🏗️ Structure du Projet

```
mon-portfolio-dynamique/
├── src/
│   ├── app/                          # App Router de Next.js
│   │   ├── layout.tsx                # Layout racine avec SEO/metadata
│   │   ├── globals.css               # Styles globaux
│   │   ├── robots.txt                # Robots pour SEO
│   │   ├── sitemap.ts                # Sitemap dynamique pour SEO
│   │   ├── (website)/                # Groupe de routes (website)
│   │   │   ├── not-found.tsx         # Page 404 personnalisée
│   │   │   └── [locale]/             # Route dynamique pour les langues
│   │   │       ├── layout.tsx        # Layout pour le contenu multilingue
│   │   │       ├── page.tsx          # Page d'accueil (SSR + données Sanity)
│   │   │       └── project/
│   │   │           └── [slug]/       # Page détail d'un projet
│   │   │               └── page.tsx
│   │   └── studio/                   # Studio Sanity CMS (montage sur /studio)
│   │       └── [[...tool]]/
│   │           ├── layout.tsx
│   │           └── page.tsx
│   │
│   ├── components/                   # Composants React réutilisables
│   │   ├── HomeClient.tsx            # Composant client pour l'accueil (animations, interactivité)
│   │   ├── Navbar.tsx                # Barre de navigation
│   │   └── ThemeProvider.tsx         # Provider pour gestion du thème (dark/light)
│   │
│   ├── sanity/                       # Configuration et logique Sanity CMS
│   │   ├── env.ts                    # Variables d'environnement Sanity
│   │   ├── structure.ts              # Structure de l'interface Studio
│   │   ├── lib/
│   │   │   ├── client.ts             # Client Sanity initialisé
│   │   │   ├── image.ts              # Utilitaires pour les images Sanity
│   │   │   ├── live.ts               # Configuration du mode live (Real-time updates)
│   │   │   └── queries.ts            # Requêtes GROQ pour Sanity
│   │   └── schemaTypes/              # Schémas de contenu
│   │       ├── project.ts            # Schéma: Projets
│   │       ├── skill.ts              # Schéma: Compétences
│   │       ├── experience.ts         # Schéma: Expériences
│   │       └── index.ts              # Export des schémas
│   │
│   ├── dictionaries/                 # Traductions i18n
│   │   ├── en.json                   # Textes en anglais
│   │   ├── fr.json                   # Textes en français
│   │   └── get-dictionary.ts         # Fonction pour charger les dictionnaires
│   │
│   ├── css.d.ts                      # Déclaration TypeScript pour CSS modules
│   └── proxy.ts                      # Configuration proxy (si nécessaire)
│
├── public/                           # Actifs statiques
│   └── googleead9021ef9c63b16.html   # Vérification Google Search Console
│
├── Configuration racine
│   ├── package.json                  # Dépendances et scripts
│   ├── next.config.ts                # Configuration Next.js
│   ├── tsconfig.json                 # Configuration TypeScript
│   ├── sanity.config.ts              # Configuration Sanity CMS
│   ├── sanity.cli.ts                 # CLI Sanity
│   ├── eslint.config.mjs             # Configuration ESLint
│   ├── postcss.config.mjs            # Configuration PostCSS (Tailwind)
│   ├── next-env.d.ts                 # Types Next.js auto-générés
│   └── README.md                     # Documentation basique
```

---

## 🛠️ Stack Technologique

### Framework & Runtime
- **Next.js 16.1.6** - Framework React fullstack avec App Router
- **React 19.2.3** - Bibliothèque UI
- **TypeScript 5** - Typage statique

### Contenu & Données
- **Sanity 5.11.0** - CMS headless avec schéma flexible
- **next-sanity 12.1.0** - Intégration Sanity avec Next.js
- **GROQ** - Langage de requête Sanity

### Styling & UI
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Tailwind PostCSS 4** - Plugin PostCSS pour Tailwind
- **styled-components 6.3.11** - CSS-in-JS (si utilisé ponctuellement)
- **Framer Motion 12.34.3** - Animations fluides

### Composants & Icônes
- **Lucide React 0.575.0** - Bibliothèque d'icônes SVG
- **@portabletext/react 6.0.2** - Rendu des blocs Portable Text de Sanity

### Thème
- **next-themes 0.4.6** - Gestion du mode clair/sombre

### Image Optimization
- **@sanity/image-url 2.0.3** - Génération d'URLs d'images Sanity optimisées
- **Image Next.js natif** - Optimisation automatique des images

### Développement
- **ESLint 9** - Linting et qualité de code
- **Node.js 20+** (recommandé)

---

## 🌐 Fonctionnalités Clés

### 1. **Multilingue (i18n)**
- **Langues supportées**: Français (FR) et Anglais (EN)
- **Implémentation**: Routes dynamiques `[locale]` avec dictionnaires JSON
- **Fonctionnement**: 
  - Charge le dictionnaire approprié selon `activeLocale`
  - Les données Sanity sont multilingues (champs `_en` pour anglais)
  - Utilise `coalesce()` en GROQ pour fallback sur la version FR

### 2. **CMS Headless avec Sanity**
- **Montage**: Studio Sanity accessible via `/studio`
- **Schémas** :
  - `project` : Projets portfolio (titre, description, slug, image, technologies, lien live)
  - `skill` : Compétences techniques (nom, niveau, catégorie, icône)
  - `experience` : Expérience professionnelle (entreprise, rôle, dates)

### 3. **SEO Optimisé**
- **Metadata**: Défini dans `layout.tsx` avec Open Graph et Twitter Cards
- **Sitemap**: Généré dynamiquement via `sitemap.ts`
- **Robots.txt**: Fichier pour les crawlers
- **Hreflang**: Balises d'alternation pour multilingue
- **Canonical URLs**: URLs canoniques configurées
- **Images**: Optimisées via Sanity + Next.js Image

### 4. **Animations & Interactions**
- **Framer Motion**: Animations smoothes sur les sections
- **Motion Variants**: `staggerContainer`, `fadeInUp` définis dans `HomeClient.tsx`
- **Responsive**: Optimisé pour mobile et desktop

### 5. **Mode Sombre/Clair**
- **Gestion**: `next-themes` + Context `ThemeProvider.tsx`
- **Stockage**: localStorage (preference utilisateur)

### 6. **Liens Sociaux**
- GitHub : https://github.com/masmoud-yacoubou
- LinkedIn : https://www.linkedin.com/in/masmoud-yacoubou
- WhatsApp : https://wa.me/22969724172

---

## 📋 Variables d'Environnement Requises

Créer un fichier `.env.local` à la racine avec :

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=<votre-project-id>
NEXT_PUBLIC_SANITY_DATASET=<votre-dataset-nom>
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-24

# URL du projet (optionnel, pour les métadonnées)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

**Où trouver ces infos?**
- Allez sur [sanity.io](https://sanity.io)
- Projet → Gestion des API
- Copier `Project ID` et `Dataset name`

---

## 🚀 Commandes Principales

```bash
# Installation des dépendances
npm install

# Développement local (http://localhost:3000)
npm run dev

# BUILD pour production
npm run build

# Démarrer le serveur de production
npm start

# Linter le code
npm run lint

# Studio Sanity (accessible via http://localhost:3000/studio)
# Ouvert automatiquement avec npm run dev

# Gérer Sanity CLI
npx sanity deploy
npx sanity dataset create <nom>
```

---

## 📁 Conventions du Projet

### Nommage des Fichiers
- **Pages**: `page.tsx` (App Router Next.js)
- **Layouts**: `layout.tsx`
- **Composants**: PascalCase (ex: `HomeClient.tsx`)
- **Utilitaires**: camelCase (ex: `get-dictionary.ts`)

### Fichiers TypeScript
- Strict mode activé (`"strict": true`)
- Alias `@/*` pour importer depuis `src/`
- Composants client marqués `"use client"`
- Types explicites sur les props

### CSS
- **Tailwind CSS** pour les styles utilitaires
- **CSS Modules** optionally (déclaration en `css.d.ts`)
- **styled-components** pour logique CSS complexe (ponctuel)

### Sanity
- **Requêtes GROQ** centralisées dans `lib/queries.ts`
- **Schémas** dans `schemaTypes/*.ts`
- **Images**: Utilise `urlFor()` de `@sanity/image-url`

---

## 🔄 Flux de Données

```
┌─────────────────────────────────────────────────┐
│           Sanity CMS Studio (/studio)            │
│      (Gérer projets, skills, expérience)         │
└─────────────────────────────────────────────────┘
                         ↓
              GROQ Queries (queries.ts)
                         ↓
┌─────────────────────────────────────────────────┐
│    Pages Next.js (getStaticProps/SSR)           │
│    - page.tsx (accueil)                         │
│    - project/[slug]/page.tsx (détail)           │
└─────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────┐
│  Composants Clients (React Hydration)           │
│  - HomeClient.tsx (animations, interactivité)   │
│  - Navbar.tsx (navigation)                      │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Points d'Amélioration (TODO)

D'après les commentaires dans le code :

1. **schema `project.ts`** :
   - ✅ Champ `link` pour lien live déjà ajouté
   - ✅ Champ optionnel pour lien GitHub déjà présent
   - 📝 À documenter davantage dans le Studio

2. **Optimisations futures** :
   - [ ] Ajouter un système de filtrage par technologie
   - [ ] Ajouter des catégories/tags pour les expériences
   - [ ] Intégrer un formulaire de contact fonctionnel
   - [ ] Dashboard d'analytics (Vercel Analytics ou autre)


