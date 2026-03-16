# Zentaana Canis — Web

Službena web stranica uzgajivačnice **Zentaana Canis** (FCI 19/25).

## Tech Stack

| Tehnologija                 | Namjena                 |
| --------------------------- | ----------------------- |
| Next.js 15 (App Router, TS) | Frontend framework      |
| Tailwind CSS v4             | Styling                 |
| Sanity v3                   | Headless CMS            |
| next-intl                   | Višejezičnost (HR / EN) |
| Framer Motion               | Animacije               |
| Behold.so                   | Instagram feed          |
| Vercel                      | Hosting                 |

## Pokretanje lokalno

```bash
git clone https://github.com/TVOJ_USERNAME/zentaana-canis.git
cd zentaana-canis
npm install
cp .env.example .env.local
npm run dev
```

Popuni `.env.local` s pravim vrijednostima (vidi sekciju Environment varijable).

- App: http://localhost:3000
- CMS: http://localhost:3000/studio

## Environment varijable

| Varijabla                       | Opis                           |
| ------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity projekt ID              |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset (production)    |
| `NEXT_PUBLIC_BEHOLD_FEED_ID`    | Behold.so feed ID za Instagram |
| `NEXT_PUBLIC_SITE_URL`          | URL stranice (za SEO, sitemap) |

## Struktura projekta

```
src/
├── app/
│   ├── [locale]/              → Stranice s i18n (HR/EN)
│   │   ├── nasi-psi/          → Lista pasa + profil
│   │   ├── legla/             → Lista legala + detalji
│   │   ├── novosti/           → Novosti + članak
│   │   ├── galerija/          → Galerija + album
│   │   ├── o-nama/            → O uzgajivačnici
│   │   ├── kontakt/           → Kontakt
│   │   └── page.tsx           → Početna stranica
│   ├── studio/                → Sanity Studio CMS
│   └── api/                   → API rute
├── components/
│   ├── ui/                    → Reusable komponente
│   ├── layout/                → Header, Footer, Navigation
│   └── sections/              → Sekcije stranica
├── lib/                       → Helperi, tipovi, SEO
├── sanity/
│   ├── schemas/               → CMS sheme
│   └── lib/                   → Client, upiti, image helper
├── i18n/
│   ├── messages/              → hr.json, en.json
│   ├── config.ts              → Locale config
│   ├── request.ts             → next-intl request
│   └── routing.ts             → Pathnames, navigacija
└── styles/                    → Globalni stilovi
```

## Stranice

| HR                 | EN                    | Opis            |
| ------------------ | --------------------- | --------------- |
| `/`                | `/en`                 | Početna         |
| `/o-nama`          | `/en/about`           | O uzgajivačnici |
| `/nasi-psi`        | `/en/our-dogs`        | Lista pasa      |
| `/nasi-psi/[slug]` | `/en/our-dogs/[slug]` | Profil psa      |
| `/legla`           | `/en/litters`         | Lista legala    |
| `/legla/[slug]`    | `/en/litters/[slug]`  | Detalji legla   |
| `/novosti`         | `/en/news`            | Novosti         |
| `/novosti/[slug]`  | `/en/news/[slug]`     | Članak          |
| `/galerija`        | `/en/gallery`         | Galerija        |
| `/galerija/[slug]` | `/en/gallery/[slug]`  | Album           |
| `/kontakt`         | `/en/contact`         | Kontakt         |
| `/studio`          | `/studio`             | CMS             |

## Build & Deploy

```bash
npm run build      # Build + generira sitemap
npm run start      # Production server
```

Deploy je automatski na Vercelu — svaki push na `main` trigera novi deploy.
