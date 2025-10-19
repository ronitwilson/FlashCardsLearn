import { Injectable } from '@nestjs/common';
import { AttemptsService } from '../attempts/attempts.service';
import { DecksService } from '../decks/decks.service';
import { Attempt } from '../../entities/attempt.entity';

export interface UserStats {
  totalWordsSeen: number;
  accuracyPercent: number;
  wordsNeedingRevision: string[]; // wordIds
  learnedWords: string[]; // wordIds
  perDeckAccuracy: { deckId: string; accuracy: number }[];
  mostMissedWords: string[]; // wordIds
}

@Injectable()
export class StatsService {
  constructor(
    private readonly attemptsService: AttemptsService,
    private readonly decksService: DecksService,
  ) {}

  async computeForUser(userId: string): Promise<UserStats> {
    const attempts = await this.attemptsService.findByUser(userId);
    const byWord: Record<string, Attempt[]> = {};
    attempts.forEach(a => { (byWord[a.wordId] ||= []).push(a); });

    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.isCorrect).length;
    const accuracyPercent = totalAttempts === 0 ? 0 : Math.round((correctAttempts / totalAttempts) * 100);

    const wordsNeedingRevision: string[] = [];
    const learnedWords: string[] = [];
    const mostMissedWords: string[] = [];

    Object.entries(byWord).forEach(([wordId, list]) => {
      const correctSeq = this.longestConsecutiveCorrect(list);
      const correctCount = list.filter(a => a.isCorrect).length;
      const incorrectCount = list.length - correctCount;
      if (correctSeq >= 3) learnedWords.push(wordId);
      if (incorrectCount > correctCount) wordsNeedingRevision.push(wordId);
      if (incorrectCount >= 3) mostMissedWords.push(wordId);
    });

    const perDeckMap: Record<string, { correct: number; total: number }> = {};
    attempts.forEach(a => {
      if (!a.deckId) return;
      perDeckMap[a.deckId] = perDeckMap[a.deckId] || { correct: 0, total: 0 };
      perDeckMap[a.deckId].total++;
      if (a.isCorrect) perDeckMap[a.deckId].correct++;
    });
    const perDeckAccuracy = Object.entries(perDeckMap).map(([deckId, v]) => ({ deckId, accuracy: v.total === 0 ? 0 : Math.round((v.correct / v.total) * 100) }));

    return { totalWordsSeen: Object.keys(byWord).length, accuracyPercent, wordsNeedingRevision, learnedWords, perDeckAccuracy, mostMissedWords };
  }

  private longestConsecutiveCorrect(list: Attempt[]): number {
    let longest = 0; let current = 0;
  list.sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime()).forEach(a => {
      if (a.isCorrect) { current++; longest = Math.max(longest, current); } else { current = 0; }
    });
    return longest;
  }
}
