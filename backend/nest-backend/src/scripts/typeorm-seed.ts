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

const seedWords = [
  'the','of','and','a','to','in','is','you','that','it',
  'he','was','for','on','are','as','with','his','they','I'
];

(async () => {
  await dataSource.initialize();
  const wordRepo = dataSource.getRepository(Word);
  for (const text of seedWords) {
    const existing = await wordRepo.findOne({ where: { text } });
    if (!existing) {
      await wordRepo.save(wordRepo.create({ text }));
      console.log(`Seeded word: ${text}`);
    }
  }
  await dataSource.destroy();
  console.log('Seeding complete');
})();
