import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Word } from '../../entities/word.entity';

@Injectable()
export class WordsService {
  constructor(@InjectRepository(Word) private readonly repo: Repository<Word>) {}

  add(text: string, difficulty?: string): Promise<Word> {
    const word = this.repo.create({ text, difficulty });
    return this.repo.save(word);
  }

  findAll(): Promise<Word[]> { return this.repo.find({ order: { text: 'ASC' } }); }
  findOne(id: string): Promise<Word | null> { return this.repo.findOne({ where: { id } }); }
  search(query: string): Promise<Word[]> { return this.repo.find({ where: { text: ILike(`%${query}%`) } }); }
}
