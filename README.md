# Menty Game Lounge

Standalone Next.js 15 (App Router) application. Visually matches the main
Menty mentorship platform (Tailwind + shadcn/ui tokens) but is a fully
independent codebase with its own isolated Neon PostgreSQL database.

## Architecture

- **Public surface** (`/`, `/games/trivia`) — zero auth, zero database
  reads, fully client/serverless.
- **Gated surface** (`/feed`) — a Next.js Server Component checks for the
  main platform's `__Secure-next-auth.session-token` cookie, decodes it
  with the *shared* `NEXTAUTH_SECRET`, and only then syncs a local user
  replica and renders `<EngineeringFeedComponent />`.
- **Database isolation** — `LOUNGE_DATABASE_URL` points at a dedicated Neon
  instance. The `User` table here is a read-mostly cache of profile
  attributes, never a source of truth for identity or credentials.

## Setup

```bash
cp .env.example .env
# fill in LOUNGE_DATABASE_URL and NEXTAUTH_SECRET

npm install
npm run db:push   # or: npm run db:migrate
npm run dev
```

## Directory map

```
prisma/schema.prisma          User / Post / Like models
src/lib/prisma.ts             Prisma client singleton (lounge DB only)
src/services/auth.ts          Cross-domain session token decoding
src/services/lounge-user.ts   User replica upsert
src/app/page.tsx              Public Game Hub dashboard
src/app/games/trivia/page.tsx Public client-side trivia game
src/app/feed/page.tsx         Gated engineering feed entry point
src/app/feed/actions.ts       Server actions: createPost, toggleLike
src/components/EngineeringFeedComponent.tsx
src/components/ui/*           shadcn/ui primitives (button, card)
```
