import { defineStore } from 'pinia';
import { api } from './api';

export interface UserStats { totalWordsSeen: number; accuracyPercent: number; wordsNeedingRevision: string[]; learnedWords: string[]; perDeckAccuracy: { deckId: string; accuracy: number }[]; mostMissedWords: string[]; }

export const useStatsStore = defineStore('statsStore', {
  state: () => ({ stats: null as UserStats | null }),
  actions: {
    async fetchStats(userId: string) { const { data } = await api.get<UserStats>(`/stats/user/${userId}`); this.stats = data; }
  }
});
