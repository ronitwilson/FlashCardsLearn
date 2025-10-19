import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Attempt } from './attempt.entity';
import { Deck } from './deck.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column({ nullable: true }) age?: number;
  @CreateDateColumn() createdAt: Date;
  @OneToMany(() => Attempt, a => a.user) attempts: Attempt[];
  @OneToMany(() => Deck, d => d.user) decks: Deck[];
}
