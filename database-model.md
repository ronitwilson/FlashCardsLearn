# Flashcard Learning App Database Model

This document outlines the database schema for the Flashcard Learning application.

## Entity Relationship Diagram

```
+-------+       +-------+       +------------+       +---------+
| Users |<----->| Decks |<----->| Flashcards |<----->| Attempts|
+-------+       +-------+       +------------+       +---------+
```

## Tables

### Users Table

Stores information about application users (learners and parents/teachers).

| Column     | Type         | Description                          | Constraints    |
|------------|--------------|--------------------------------------|----------------|
| id         | SERIAL       | Unique identifier for the user       | PRIMARY KEY    |
| name       | VARCHAR(100) | User's name                          | NOT NULL       |
| age        | INTEGER      | User's age                           | -              |
| created_at | TIMESTAMP    | When the user was created            | DEFAULT now()  |

### Decks Table

Organizes flashcards into logical collections.

| Column      | Type         | Description                       | Constraints                |
|-------------|--------------|-----------------------------------|----------------------------|
| id          | SERIAL       | Unique identifier for the deck    | PRIMARY KEY                |
| name        | VARCHAR(100) | Name of the deck                  | NOT NULL                   |
| description | TEXT         | Description of the deck contents  | -                          |
| user_id     | INTEGER      | ID of the user who owns the deck  | FOREIGN KEY (users.id)     |
| created_at  | TIMESTAMP    | When the deck was created         | DEFAULT now()              |

### Flashcards Table

Individual sight words for learning.

| Column     | Type         | Description                       | Constraints                |
|------------|--------------|-----------------------------------|----------------------------|
| id         | SERIAL       | Unique identifier for the card    | PRIMARY KEY                |
| word       | VARCHAR(100) | The sight word                    | NOT NULL                   |
| deck_id    | INTEGER      | ID of the deck this card belongs to| FOREIGN KEY (decks.id)    |
| created_at | TIMESTAMP    | When the flashcard was created    | DEFAULT now()              |

### Attempts Table

Tracks learning history and progress for each flashcard.

| Column       | Type         | Description                       | Constraints                 |
|--------------|--------------|-----------------------------------|----------------------------|
| id           | SERIAL       | Unique identifier for the attempt | PRIMARY KEY                |
| flashcard_id | INTEGER      | ID of the flashcard attempted     | FOREIGN KEY (flashcards.id)|
| user_id      | INTEGER      | ID of the user who made the attempt| FOREIGN KEY (users.id)    |
| is_correct   | BOOLEAN      | Whether the attempt was correct   | NOT NULL                   |
| created_at   | TIMESTAMP    | When the attempt was made         | DEFAULT now()              |

## Relationships

1. **Users to Decks**: One-to-many. A user can create multiple decks.
2. **Decks to Flashcards**: One-to-many. A deck contains multiple flashcards.
3. **Users to Attempts**: One-to-many. A user makes multiple learning attempts.
4. **Flashcards to Attempts**: One-to-many. A flashcard can have multiple learning attempts.

## Sample Data

### Users
- Child User (age 8)
- Parent User (age 35)

### Decks
- Basic Sight Words (belongs to Child User)
- Advanced Words (belongs to Child User)

### Flashcards
- Basic deck: the, and, a, to, in, is, you, that, it, he
- Advanced deck: for, they, with, have, this

## Data Analysis Opportunities

With this schema, you can:

1. Track individual user progress across different decks
2. Identify which flashcards are most challenging (have the most incorrect attempts)
3. Measure learning improvements over time
4. Generate personalized learning recommendations based on past performance
