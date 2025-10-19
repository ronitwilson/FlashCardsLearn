import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attempt } from '../../entities/attempt.entity';

@Injectable()
export class AttemptsService {
  constructor(@InjectRepository(Attempt) private readonly repo: Repository<Attempt>) {}

  async record(userId: string, wordId: string, deckId: string | undefined, isCorrect: boolean): Promise<Attempt> {
    const attempt = this.repo.create({ userId, wordId, deckId, isCorrect });
    return this.repo.save(attempt);
  }

  findByUser(userId: string): Promise<Attempt[]> { return this.repo.find({ where: { userId }, order: { timestamp: 'ASC' } }); }
  all(): Promise<Attempt[]> { return this.repo.find(); }
}
