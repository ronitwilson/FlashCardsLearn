import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WordsModule } from './words/words.module';
import { DecksModule } from './decks/decks.module';
import { AttemptsModule } from './attempts/attempts.module';
import { StatsModule } from './stats/stats.module';
import { User } from '../entities/user.entity';
import { Word } from '../entities/word.entity';
import { Deck } from '../entities/deck.entity';
import { DeckWord } from '../entities/deck-word.entity';
import { Attempt } from '../entities/attempt.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.db',
      entities: [User, Word, Deck, DeckWord, Attempt],
      synchronize: true, // dev only
    }),
    UsersModule,
    WordsModule,
    DecksModule,
    AttemptsModule,
    StatsModule,
  ],
})
export class AppModule {}
