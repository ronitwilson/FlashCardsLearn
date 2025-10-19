import { defineStore } from 'pinia';
import { api } from './api';

export interface Deck { id: string; name: string; wordIds: string[]; generated: boolean; createdAt: string; }

export const useDecksStore = defineStore('decksStore', {
  state: () => ({ decks: [] as Deck[] }),
  actions: {
    async fetchDecks() { const { data } = await api.get<Deck[]>('/decks'); this.decks = data; },
    async createDeck(name: string, wordIds: string[] = []) { const { data } = await api.post<Deck>('/decks', { name, wordIds }); this.decks.push(data); },
    async generateDeck(size: number) { const { data } = await api.post<Deck>('/decks/generate', { size }); this.decks.push(data); }
  }
});
