# Flashcard Learning App Architecture Diagrams

This document outlines the architecture of the Flashcard Learning application, including UML diagrams for both frontend and backend components.

## Frontend Architecture (Vue.js)

### Component Hierarchy

```mermaid
graph TD
    App --> NavBar
    App --> RouterView
    RouterView --> Home
    RouterView --> FlashcardView
    RouterView --> DeckManagement
    RouterView --> UserProgress
    
    FlashcardView --> FlashcardComponent
    FlashcardView --> ProgressBar
    FlashcardView --> ResultButtons
    
    DeckManagement --> DeckList
    DeckManagement --> CreateDeckForm
    DeckManagement --> EditDeck
    
    UserProgress --> ProgressStats
    UserProgress --> ProgressCharts
    UserProgress --> DifficultWords

    Home --> UserInfo
    Home --> RecentDecks
    Home --> LearningStats
```

### Vuex Store Structure

```mermaid
classDiagram
    class Store {
        state
        getters
        mutations
        actions
    }
    
    class State {
        user: User
        decks: Deck[]
        currentDeck: Deck
        flashcards: Flashcard[]
        currentFlashcardIndex: number
        learningHistory: Attempt[]
        userProgress: Progress
    }
    
    class Getters {
        isLoggedIn()
        currentUser()
        allDecks()
        currentFlashcard()
        progressByDeck()
        difficultWords()
        masteredWords()
    }
    
    class Mutations {
        SET_USER()
        SET_DECKS()
        SET_CURRENT_DECK()
        SET_FLASHCARDS()
        SET_CURRENT_FLASHCARD_INDEX()
        ADD_ATTEMPT()
        UPDATE_PROGRESS()
    }
    
    class Actions {
        login()
        logout()
        fetchDecks()
        createDeck()
        updateDeck()
        deleteDeck()
        fetchFlashcards()
        startLearningSession()
        recordAttempt()
        generateReport()
    }
    
    Store *-- State
    Store *-- Getters
    Store *-- Mutations
    Store *-- Actions
```

### Frontend Data Models

```mermaid
classDiagram
    class User {
        +id: number
        +name: string
        +age: number
        +createdAt: Date
    }
    
    class Deck {
        +id: number
        +name: string
        +description: string
        +userId: number
        +createdAt: Date
        +getCompletionRate()
    }
    
    class Flashcard {
        +id: number
        +word: string
        +deckId: number
        +createdAt: Date
        +attempts: Attempt[]
        +getDifficultyRating()
    }
    
    class Attempt {
        +id: number
        +flashcardId: number
        +userId: number
        +isCorrect: boolean
        +createdAt: Date
    }
    
    class Progress {
        +userId: number
        +deckId: number
        +totalAttempts: number
        +correctAttempts: number
        +lastAttempted: Date
        +getAccuracy()
    }
    
    User "1" -- "many" Deck : creates
    Deck "1" -- "many" Flashcard : contains
    User "1" -- "many" Attempt : makes
    Flashcard "1" -- "many" Attempt : has
    User "1" -- "many" Progress : tracks
    Deck "1" -- "1" Progress : has
```

## Backend Architecture (NestJS)

### Module Structure

```mermaid
graph TD
    AppModule --> UsersModule
    AppModule --> DecksModule
    AppModule --> FlashcardsModule
    AppModule --> ProgressModule
    
    UsersModule --> UsersController
    UsersModule --> UsersService
    UsersModule --> UserEntity
    
    DecksModule --> DecksController
    DecksModule --> DecksService
    DecksModule --> DeckEntity
    
    FlashcardsModule --> FlashcardsController
    FlashcardsModule --> FlashcardsService
    FlashcardsModule --> FlashcardEntity
    FlashcardsModule --> AttemptsService
    FlashcardsModule --> AttemptEntity
    
    ProgressModule --> ProgressController
    ProgressModule --> ProgressService
    
    DatabaseModule --> TypeOrmModule
```

### Backend Entities

```mermaid
classDiagram
    class UserEntity {
        +id: number
        +name: string
        +age: number
        +createdAt: Date
        +decks: DeckEntity[]
        +attempts: AttemptEntity[]
    }
    
    class DeckEntity {
        +id: number
        +name: string
        +description: string
        +userId: number
        +createdAt: Date
        +user: UserEntity
        +flashcards: FlashcardEntity[]
    }
    
    class FlashcardEntity {
        +id: number
        +word: string
        +deckId: number
        +createdAt: Date
        +deck: DeckEntity
        +attempts: AttemptEntity[]
    }
    
    class AttemptEntity {
        +id: number
        +flashcardId: number
        +userId: number
        +isCorrect: boolean
        +createdAt: Date
        +flashcard: FlashcardEntity
        +user: UserEntity
    }
    
    UserEntity "1" -- "many" DeckEntity : has
    DeckEntity "1" -- "many" FlashcardEntity : contains
    UserEntity "1" -- "many" AttemptEntity : makes
    FlashcardEntity "1" -- "many" AttemptEntity : has
```

### Services and Controllers

```mermaid
classDiagram
    class UsersController {
        +getUsers()
        +getUserById()
        +createUser()
        +updateUser()
        +deleteUser()
    }
    
    class UsersService {
        -usersRepository
        +findAll()
        +findOne()
        +create()
        +update()
        +remove()
    }
    
    class DecksController {
        +getDecks()
        +getDeckById()
        +createDeck()
        +updateDeck()
        +deleteDeck()
        +getDeckFlashcards()
    }
    
    class DecksService {
        -decksRepository
        +findAll()
        +findOne()
        +create()
        +update()
        +remove()
        +getFlashcards()
    }
    
    class FlashcardsController {
        +getFlashcards()
        +getFlashcardById()
        +createFlashcard()
        +updateFlashcard()
        +deleteFlashcard()
        +addAttempt()
        +getAttempts()
    }
    
    class FlashcardsService {
        -flashcardsRepository
        +findAll()
        +findOne()
        +create()
        +update()
        +remove()
    }
    
    class AttemptsService {
        -attemptsRepository
        +createAttempt()
        +getAttemptsByFlashcard()
        +getAttemptsByUser()
    }
    
    class ProgressController {
        +getUserProgress()
        +getDeckProgress()
        +getFlashcardStats()
        +generateUserReport()
    }
    
    class ProgressService {
        -attemptsRepository
        +calculateUserProgress()
        +calculateDeckProgress()
        +getDifficultWords()
        +getMasteredWords()
        +generateProgressReport()
    }
    
    UsersController --> UsersService : uses
    DecksController --> DecksService : uses
    FlashcardsController --> FlashcardsService : uses
    FlashcardsController --> AttemptsService : uses
    ProgressController --> ProgressService : uses
```

## API Flow Diagram

```mermaid
sequenceDiagram
    participant Client as Vue Frontend
    participant API as NestJS Backend
    participant DB as PostgreSQL Database
    
    Client->>API: GET /api/decks
    API->>DB: Query decks
    DB-->>API: Return decks data
    API-->>Client: Return JSON response
    
    Client->>API: GET /api/decks/{id}/flashcards
    API->>DB: Query flashcards by deck
    DB-->>API: Return flashcards
    API-->>Client: Return JSON response
    
    Client->>API: POST /api/flashcards/{id}/attempts
    API->>DB: Store attempt record
    DB-->>API: Confirm storage
    API-->>Client: Return success response
    
    Client->>API: GET /api/progress/user/{id}
    API->>DB: Query user attempts and calculate stats
    DB-->>API: Return attempt records
    API-->>Client: Return processed progress data
```

## Data Flow Diagram

```mermaid
graph LR
    User[User Interaction] -->|Selects deck| App
    App -->|Fetches flashcards| Backend
    Backend -->|Queries| Database
    Database -->|Returns data| Backend
    Backend -->|JSON response| App
    App -->|Shows flashcard| User
    User -->|Marks correct/incorrect| App
    App -->|Records attempt| Backend
    Backend -->|Updates| Database
    App -->|Requests progress| Backend
    Backend -->|Calculates statistics| Backend
    Backend -->|Returns progress data| App
    App -->|Displays charts| User
```

This architecture provides a complete view of the Flashcard Learning application's components, their relationships, and data flow, ensuring a maintainable and scalable system.
