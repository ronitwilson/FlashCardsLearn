import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Word } from '../entities/word.entity';
import { Deck } from '../entities/deck.entity';
import { DeckWord } from '../entities/deck-word.entity';
import { Attempt } from '../entities/attempt.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'dev.db',
  entities: [User, Word, Deck, DeckWord, Attempt],
  synchronize: true,
  logging: false,
});

(async () => {
  await dataSource.initialize();
  console.log('Schema synchronized');
  await dataSource.destroy();
})();
