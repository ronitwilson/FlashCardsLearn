import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { DeckWord } from './deck-word.entity';
import { Attempt } from './attempt.entity';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) text: string;
  @Column({ nullable: true }) difficulty?: string;
  @CreateDateColumn() createdAt: Date;
  @OneToMany(() => DeckWord, dw => dw.word) deckWords: DeckWord[];
  @OneToMany(() => Attempt, a => a.word) attempts: Attempt[];
}
