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
| Vercel                      | Hosting                 |

## Struktura projekta

```
src/
├── app/
│   ├── [locale]/          → i18n stranice (hr/en)
│   └── studio/            → Sanity Studio CMS (/studio)
├── components/
│   ├── ui/                → Reusable UI komponente
│   ├── layout/            → Header, Footer, Navigation
│   └── sections/          → Sekcije stranica
├── lib/                   → Helperi, tipovi, konstante
├── sanity/
│   ├── schemas/           → CMS sheme
│   └── lib/               → Sanity client, GROQ upiti, image helper
├── i18n/
│   ├── messages/          → hr.json, en.json prijevodi
│   ├── config.ts          → Locale konfiguracija
│   ├── request.ts         → next-intl request config
│   └── routing.ts         → Pathnames, navigacija
└── styles/                → Globalni stilovi
```

## Pokretanje lokalno

```bash
npm install
cp .env.example .env.local  # popuni Sanity credentials
npm run dev
```

- App: http://localhost:3000
- CMS: http://localhost:3000/studio

## Environment varijable

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
```

## Stranice

| Ruta (HR)          | Ruta (EN)             | Opis                      |
| ------------------ | --------------------- | ------------------------- |
| `/`                | `/en`                 | Početna                   |
| `/o-nama`          | `/en/about`           | O uzgajivačnici           |
| `/nasi-psi`        | `/en/our-dogs`        | Lista pasa                |
| `/nasi-psi/[slug]` | `/en/our-dogs/[slug]` | Profil psa                |
| `/legla`           | `/en/litters`         | Lista legala              |
| `/legla/[slug]`    | `/en/litters/[slug]`  | Detalji legla             |
| `/novosti`         | `/en/news`            | Novosti / blog            |
| `/novosti/[slug]`  | `/en/news/[slug]`     | Pojedinačna novost        |
| `/galerija`        | `/en/gallery`         | Foto galerija + Instagram |
| `/kontakt`         | `/en/contact`         | Kontakt forma             |
| `/studio`          | `/studio`             | Sanity CMS Studio         |

## CMS — Sanity Studio

Klijent pristupa na `/studio` i može uređivati:

- Pse (slike, nagrade, zdravlje, opis)
- Legla (roditelji, štenad, status)
- Novosti (rich text, kategorije)
- Galeriju (albumi)
- Postavke stranice (kontakt, mreže, about tekst)

## 4. Kreiraj `.env.example`

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
```
