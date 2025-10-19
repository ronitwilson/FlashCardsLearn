import { defineStore } from 'pinia';
import { api } from './api';

export interface Attempt { id: string; userId: string; wordId: string; deckId?: string; isCorrect: boolean; timestamp: string; }

export const useAttemptsStore = defineStore('attemptsStore', {
  state: () => ({ attempts: [] as Attempt[] }),
  actions: {
    async recordAttempt(userId: string, wordId: string, deckId: string | undefined, isCorrect: boolean) {
      const { data } = await api.post<Attempt>('/attempts', { userId, wordId, deckId, isCorrect });
      this.attempts.push(data);
    },
    async fetchUserAttempts(userId: string) { const { data } = await api.get<Attempt[]>(`/attempts/user/${userId}`); this.attempts = data; }
  }
});
