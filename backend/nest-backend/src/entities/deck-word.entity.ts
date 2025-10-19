import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Deck } from './deck.entity';
import { Word } from './word.entity';

@Entity('deck_words')
@Unique(['deck', 'word'])
export class DeckWord {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Deck, d => d.deckWords, { onDelete: 'CASCADE' }) deck: Deck;
  @ManyToOne(() => Word, w => w.deckWords, { onDelete: 'CASCADE' }) word: Word;
}
