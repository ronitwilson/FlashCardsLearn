import { defineStore } from 'pinia';
import { useDecksStore } from './decksStore';
import { useWordsStore } from './wordsStore';

export const usePlayStore = defineStore('playStore', {
  state: () => ({ currentDeckId: null as string | null }),
  getters: {
    currentDeckWords(state) {
      const decks = useDecksStore();
      const words = useWordsStore();
      if (!state.currentDeckId) return [];
      const deck = decks.decks.find(d => d.id === state.currentDeckId);
      if (!deck) return [];
      return deck.wordIds.map(id => words.words.find(w => w.id === id)).filter(Boolean);
    }
  },
  actions: {
    loadDeck(id: string) { this.currentDeckId = id; }
  }
});
