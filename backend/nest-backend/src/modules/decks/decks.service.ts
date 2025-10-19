import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from '../../entities/deck.entity';
import { DeckWord } from '../../entities/deck-word.entity';
import { Word } from '../../entities/word.entity';

export interface DeckDto { id: string; name: string; wordIds: string[]; generated: boolean; createdAt: string; }

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck) private readonly deckRepo: Repository<Deck>,
    @InjectRepository(DeckWord) private readonly deckWordRepo: Repository<DeckWord>,
    @InjectRepository(Word) private readonly wordRepo: Repository<Word>,
  ) {}

  async create(name: string, wordIds: string[] = [], generated = false): Promise<DeckDto> {
    const deck = this.deckRepo.create({ name, generated });
    const saved = await this.deckRepo.save(deck);
    if (wordIds.length) {
      const links = wordIds.map(id => this.deckWordRepo.create({ deck: saved, word: { id } as Word }));
      await this.deckWordRepo.save(links);
    }
    return this.findOne(saved.id) as Promise<DeckDto>;
  }

  async generate(size: number): Promise<DeckDto> {
    const words = await this.wordRepo.find({ take: size, order: { createdAt: 'ASC' } });
    return this.create(`Generated ${size}`, words.map(w => w.id), true);
  }

  async findAll(): Promise<DeckDto[]> {
    const decks = await this.deckRepo.find({ relations: ['deckWords', 'deckWords.word'] });
    return decks.map(d => this.toDto(d));
  }
  async findOne(id: string): Promise<DeckDto | null> {
    const deck = await this.deckRepo.findOne({ where: { id }, relations: ['deckWords', 'deckWords.word'] });
    return deck ? this.toDto(deck) : null;
  }

  private toDto(deck: Deck): DeckDto {
    return { id: deck.id, name: deck.name, generated: deck.generated, createdAt: deck.createdAt.toISOString?.() || (deck.createdAt as any), wordIds: (deck.deckWords||[]).map(dw => dw.word.id) };
  }
}
