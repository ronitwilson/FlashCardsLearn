import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from './user.entity';
import { Word } from './word.entity';
import { Deck } from './deck.entity';

@Entity('attempts')
export class Attempt {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() @Index() userId: string;
  @Column() @Index() wordId: string;
  @Column({ nullable: true }) @Index() deckId?: string;
  @Column() isCorrect: boolean;
  @CreateDateColumn() timestamp: Date;
  @ManyToOne(() => User, u => u.attempts, { onDelete: 'CASCADE' }) user: User;
  @ManyToOne(() => Word, w => w.attempts, { onDelete: 'CASCADE' }) word: Word;
  @ManyToOne(() => Deck, d => d.attempts, { nullable: true, onDelete: 'SET NULL' }) deck?: Deck;
}
