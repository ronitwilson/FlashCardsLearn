import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { DeckWord } from './deck-word.entity';
import { Attempt } from './attempt.entity';
import { User } from './user.entity';

@Entity('decks')
export class Deck {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column({ default: false }) generated: boolean;
  @CreateDateColumn() createdAt: Date;
  @ManyToOne(() => User, u => u.decks, { nullable: true }) user?: User;
  @OneToMany(() => DeckWord, dw => dw.deck) deckWords: DeckWord[];
  @OneToMany(() => Attempt, a => a.deck) attempts: Attempt[];
}
