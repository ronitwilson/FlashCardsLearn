# Database Model Documentation (Prisma + SQLite)

This document describes the data model used by the Sight Words Flashcards application. The schema is defined with Prisma and currently targets **SQLite** (easily switchable to PostgreSQL by changing the datasource provider and URL).

## Overview

Entities:

- User: Learners using the system.
- Word: Sight words the learner practices.
- Deck: A collection of words (manual or generated).
- DeckWord: Join table associating Words with Decks.
- Attempt: A recorded answer (correct/incorrect) by a user for a word (optionally within a deck).

## Prisma Schema (Reference)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  name      String
  age       Int?
  createdAt DateTime  @default(now())
  attempts  Attempt[]
  decks     Deck[]
}

model Word {
  id        String      @id @default(cuid())
  text      String      @unique
  difficulty String?
  createdAt DateTime    @default(now())
  deckWords DeckWord[]
  attempts  Attempt[]
}

model Deck {
  id        String      @id @default(cuid())
  name      String
  generated Boolean     @default(false)
  createdAt DateTime    @default(now())
  wordLinks DeckWord[]
  attempts  Attempt[]
  userId    String?
  user      User?       @relation(fields: [userId], references: [id])
}

model DeckWord {
  deckId String
  wordId String
  deck   Deck   @relation(fields: [deckId], references: [id])
  word   Word   @relation(fields: [wordId], references: [id])
  @@id([deckId, wordId])
}

model Attempt {
  id        String    @id @default(cuid())
  userId    String
  wordId    String
  deckId    String?
  isCorrect Boolean
  timestamp DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])
  word      Word      @relation(fields: [wordId], references: [id])
  deck      Deck?     @relation(fields: [deckId], references: [id])
  @@index([userId])
  @@index([wordId])
  @@index([deckId])
}
```

## Entity Details

### User

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| name | String | Required learner name |
| age | Int? | Optional age |
| createdAt | DateTime | Auto timestamp |
| attempts | Relation | All attempts by this user |
| decks | Relation | Decks created/owned (optional user association) |

### Word

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| text | String | Unique text of the sight word |
| difficulty | String? | Future: difficulty classification |
| createdAt | DateTime | Auto timestamp |
| deckWords | Relation | Join records linking to decks |
| attempts | Relation | Attempts referencing this word |

### Deck

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| name | String | Deck name |
| generated | Boolean | True if system-generated |
| createdAt | DateTime | Auto timestamp |
| wordLinks | Relation | Join rows (DeckWord) mapping words |
| attempts | Relation | Attempts tied to this deck context |
| userId | String? | Optional owner user |
| user | Relation | User owning the deck |

### DeckWord (Join Table)

Composite primary key `(deckId, wordId)`. Ensures uniqueness of a word within a deck.

| Field | Type | Notes |
|-------|------|-------|
| deckId | String | FK -> Deck.id |
| wordId | String | FK -> Word.id |

### Attempt

| Field | Type | Notes |
|-------|------|-------|
| id | String (cuid) | Primary key |
| userId | String | FK -> User.id |
| wordId | String | FK -> Word.id |
| deckId | String? | Optional FK (attempt may occur outside deck context) |
| isCorrect | Boolean | True if learner marked as known |
| timestamp | DateTime | Attempt creation time |

Indexes on `userId`, `wordId`, `deckId` speed retrieval for analytics and per-user history.

## Relationships Summary

User 1---* Attempt
Word 1---* Attempt
Deck 1---* Attempt (optional link)
Deck *---* Word (via DeckWord)
User 1---* Deck (optional ownership)
```text
User 1---* Attempt
Word 1---* Attempt
Deck 1---* Attempt (optional link)
Deck *---* Word (via DeckWord)
User 1---* Deck (optional ownership)
```

## Common Queries (Prisma Client)

```ts
// Create user
await prisma.user.create({ data: { name: 'Alice', age: 6 } });

// Add word
await prisma.word.create({ data: { text: 'the' } });

// Create deck with existing word IDs
await prisma.deck.create({
  data: { name: 'Practice Set', wordLinks: { create: wordIds.map(id => ({ wordId: id })) } },
  include: { wordLinks: true }
});

// Record attempt
await prisma.attempt.create({ data: { userId, wordId, deckId, isCorrect: true } });

// Compute learned words heuristic (>=3 consecutive correct)
const attempts = await prisma.attempt.findMany({ where: { userId }, orderBy: { timestamp: 'asc' } });
```

## Migration / Generation Commands

Local development:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

In Docker (backend container):

```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npx prisma db seed
```

## Seeding

Seed script (`prisma/seed.ts`) inserts a baseline set of common sight words. Safe to rerun (uses `upsert`). Extend the list or add categories by adding fields (e.g., `gradeLevel` or `listName`).

## Extending the Schema

Potential additions:

| Addition | Rationale |
|----------|-----------|
| WordStat (per-user per-word aggregated stats) | Faster dashboard queries |
| Difficulty auto-field | Adjust practice selection |
| Tag model + WordTag join | Categorize words by theme |
| Session model | Group attempts into study sessions |
| Achievement model | Gamification badges |

Example extension snippet:

```prisma
model WordStat {
  id        String   @id @default(cuid())
  userId    String
  wordId    String
  correctCount Int    @default(0)
  incorrectCount Int  @default(0)
  lastAttempt DateTime?
  user      User   @relation(fields: [userId], references: [id])
  word      Word   @relation(fields: [wordId], references: [id])
  @@unique([userId, wordId])
}
```
You’d then update attempt recording logic to increment counts.

## Switching to PostgreSQL

Change datasource:

```prisma
provider = "postgresql"
```

Update `.env`:

```env
DATABASE_URL=postgres://user:pass@host:5432/dbname
```

Run a new migration. Ensure Docker Compose includes a Postgres service.

## Data Integrity Considerations

- `Attempt.deckId` is nullable allowing ad-hoc practice outside decks.
- `Word.text` is unique preventing duplicates.
- `DeckWord` composite key ensures a word isn’t added twice to the same deck.
- Cascading deletes are not set; deleting a word or deck requires manual cleanup (Prisma can be configured with referential actions if needed).

## Performance Notes

- For small datasets SQLite is sufficient. As data grows, consider Postgres and adding materialized views or scheduled aggregation jobs.
- Indexes on attempt foreign keys allow efficient filtering by user / word / deck.

## Analytics Heuristics (Current Implementation)

- Learned Word: >=3 consecutive correct attempts.
- Needs Revision: incorrect attempts > correct attempts.
- Most Missed: >=3 incorrect attempts.

These are computed dynamically; shifting to precomputed stats (e.g., `WordStat`) will reduce query CPU for large histories.

## Backup & Persistence

- SQLite file stored inside container volume `backend_data` (see `docker-compose.yml`).
- To backup: copy the `dev.db` file from the volume.

## Testing Suggestions

- Use an in-memory SQLite URL: `DATABASE_URL="file:.:memory:?cache=shared"` for fast tests.
- Mock Prisma via dependency injection for unit tests of services (or use a test schema + migrate).

## Security & Privacy

- No PII beyond optional age; consider adding parental consent if expanding.
- For multi-tenant / online deployment: add auth (JWT), per-user isolation, and remove open CORS wildcard.

---
Last updated: Auto-generated documentation for the current Prisma schema. Update this file after any schema changes.
