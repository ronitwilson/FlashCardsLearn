# Sight Words Flashcards App

## Overview

A full-stack learning app helping users (kids) practice sight words via flashcards while tracking progress (accuracy, learned words, revision needs). Backend built with NestJS + TypeORM (SQLite for dev). Frontend built with Vue 3 + Pinia + Vue Router + Vite.

## Features (MVP)

- Users: create/select simple user profiles
- Words: add new sight words
- Decks: manual creation & auto generation
- Flashcard Play: mark known / unknown (keyboard shortcuts: Space/Enter = know, Escape = don't know)
- Attempts Tracking: each answer recorded
- Stats Dashboard: accuracy, learned words, per-deck accuracy

## Tech Stack

- Backend: NestJS (TypeScript) + TypeORM (SQLite dev DB)
- Frontend: Vue 3 + Vite + Pinia + Vue Router + Axios

## Folder Structure

```text
backend/nest-backend
frontend/vue-app
```

## Prerequisites

- Node.js 18+ (recommended)
- npm (bundled with Node)

## Setup (Windows PowerShell)

### 1. Install Backend Dependencies

```powershell
cd backend/nest-backend
npm install
```

### 2. Run Backend (Port 3000)

```powershell
npm run start:dev
```

API base: <http://localhost:3000/api>

### 3. Install Frontend Dependencies

Open a new terminal:

```powershell
cd ../../frontend/vue-app
npm install
```

### 4. Run Frontend (Vite default port 5173)

```powershell
npm run dev
```

Visit: <http://localhost:5173>

## Running with Docker Compose

You can run both backend (NestJS + Prisma + SQLite) and frontend (Ngx static) via Docker Compose.

### 1. Build images

```powershell
docker compose build
```

### 2. Start the stack

```powershell
docker compose up -d
```

Services:

- Backend: <http://localhost:3000/api>
- Frontend: <http://localhost:8080>

The SQLite database file lives inside the backend container volume `backend_data`.

### 3. (Optional) Sync schema & seed

TypeORM uses decorators and can auto-create tables with `synchronize: true` (dev only). For explicit synchronization / seed you can exec inside the backend container:

```powershell
docker compose exec backend npm run db:sync
docker compose exec backend npm run db:seed
```

### 4. Logs & troubleshooting

```powershell
docker compose logs -f backend
docker compose logs -f frontend
```

### 5. Stop / remove

```powershell
docker compose down
```

### 6. Reset database (delete volume)

```powershell
docker compose down -v
docker compose up -d
```

### 7. Rebuild after code changes

```powershell
docker compose build --no-cache
docker compose up -d
```

## Environment Variables (Future / Docker)

## Environment Variables (Future)

Currently none required. Later you can add a `.env` for backend (DB connection, etc.).

## API Summary

- POST /api/users
- GET /api/users
- GET /api/users/:id
- POST /api/words
- GET /api/words
- GET /api/words/:id
- GET /api/words/search?q=term
- POST /api/decks
- POST /api/decks/generate
- GET /api/decks
- GET /api/decks/:id
- POST /api/attempts
- GET /api/attempts/user/:userId
- GET /api/stats/user/:userId

## Routing

The SPA now uses Vue Router. Available paths:

| Path    | View          |
|---------|---------------|
| `/play` | Flashcard play|
| `/decks`| Deck builder  |
| `/words`| Words list    |
| `/stats`| Stats dashboard|
| `/user` | User profile  |

Navigation is implemented via `<RouterLink>` elements in `App.vue` and content rendered with `<RouterView>`.

## Learning Logic (Simplified)

- Learned word: >=3 consecutive correct attempts.
- Needs revision: incorrect attempts > correct attempts.
- Most missed: >=3 incorrect attempts.

## Next Steps / Roadmap

1. Persistence: Already using TypeORM + SQLite; consider Postgres for production.
2. Auth: Add simple login / JWT for multi-user security.
3. Difficulty: Track per-word difficulty and adapt generation.
4. UI Polish: Add charts (Chart.js), responsive improvements.
5. Tests: Unit tests for services (UsersService, StatsService, DecksService).
6. Accessibility: Larger buttons, ARIA labels, focus management.
7. Export/Import: Word lists JSON import/export.
8. Real-time: WebSocket updates for teacher dashboard.

## Basic Manual Test Flow

1. Start backend and frontend.
2. Create a user.
3. Add several words.
4. Generate a deck of size 5.
5. Load deck and play marking some correct/incorrect.
6. Open Stats tab to view accuracy.

## Troubleshooting

- If modules not found: Ensure `npm install` completed in each folder.
- CORS issues: Add CORS enable snippet to `main.ts` if hosting separately.

```ts
// app.enableCors();
```

- Port conflicts: Change ports in frontend dev command (`vite --port 5173`).

## License

MIT (add a LICENSE file if distributing).

---
Generated MVP scaffolding. Ready for iteration.

## Additional Documentation

See detailed architecture docs:

- [Backend Architecture](./docs/backend_architecture.md)
- [Frontend Architecture](./docs/frontend_architecture.md)
