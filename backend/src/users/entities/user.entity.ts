import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Deck } from '../../decks/entities/deck.entity';
import { Attempt } from '../../flashcards/entities/attempt.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Deck, deck => deck.user)
  decks: Deck[];

  @OneToMany(() => Attempt, attempt => attempt.user)
  attempts: Attempt[];
}
