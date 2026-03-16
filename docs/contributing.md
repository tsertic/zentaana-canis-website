# Contributing — Zentaana Canis

## Development setup

```bash
git clone https://github.com/TVOJ_USERNAME/zentaana-canis.git
cd zentaana-canis
npm install
cp .env.example .env.local
npm run dev
```

## Branch strategy

- `main` — production, auto-deploy na Vercel
- `dev` — development branch
- Feature branches: `feat/ime-featurea`

## Commit convention

```
feat: nova funkcionalnost
fix: popravka buga
docs: dokumentacija
style: styling promjene
refactor: refaktoring koda
chore: maintenance
```

## Tech stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Sanity v3 (CMS)
- next-intl (i18n)
- Framer Motion (animacije)

## Key files

- `sanity.config.ts` — Sanity Studio konfiguracija
- `src/i18n/routing.ts` — Sve rute i pathnames
- `src/sanity/schemas/` — CMS sheme
- `src/sanity/lib/queries/` — GROQ upiti
- `src/lib/types.ts` — TypeScript tipovi
- `src/i18n/messages/` — Prijevodi HR/EN

## Adding a new page

1. Dodaj pathname u `src/i18n/routing.ts`
2. Kreiraj `src/app/[locale]/nova-stranica/page.tsx`
3. Dodaj prijevode u `hr.json` i `en.json`
4. Dodaj link u navigaciju (`Navigation.tsx`, `MobileMenu.tsx`, `Footer.tsx`)

## Adding a new Sanity schema

1. Kreiraj schema u `src/sanity/schemas/`
2. Registriraj u `src/sanity/schemas/index.ts`
3. Dodaj GROQ upite u `src/sanity/lib/queries/`
4. Dodaj TypeScript tipove u `src/lib/types.ts`
5. Po potrebi dodaj u Studio strukturu (`src/sanity/structure.ts`)
