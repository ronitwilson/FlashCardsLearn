import { defineStore } from 'pinia';
import { api } from './api';

export interface Word { id: string; text: string; difficulty?: string; deckIds: string[]; createdAt: string; }

export const useWordsStore = defineStore('wordsStore', {
  state: () => ({ words: [] as Word[] }),
  actions: {
    async fetchWords() { const { data } = await api.get<Word[]>('/words'); this.words = data; },
    async addWord(text: string, difficulty?: string) { const { data } = await api.post<Word>('/words', { text, difficulty }); this.words.push(data); }
  }
});
