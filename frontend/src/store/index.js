import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    decks: [],
    currentDeck: null,
    flashcards: [],
    progress: {}
  },
  getters: {
    isLoggedIn: state => !!state.user,
    currentUser: state => state.user,
    allDecks: state => state.decks,
    currentFlashcards: state => state.flashcards
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setDecks(state, decks) {
      state.decks = decks;
    },
    setCurrentDeck(state, deck) {
      state.currentDeck = deck;
    },
    setFlashcards(state, flashcards) {
      state.flashcards = flashcards;
    },
    updateProgress(state, progress) {
      state.progress = { ...state.progress, ...progress };
    }
  },
  actions: {
    async fetchDecks({ commit }) {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/decks`);
      commit('setDecks', response.data);
    },
    async fetchFlashcards({ commit }, deckId) {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/decks/${deckId}/flashcards`);
      commit('setFlashcards', response.data);
    },
    async markFlashcardResult({ commit, state }, { flashcardId, isCorrect }) {
      await axios.post(`${process.env.VUE_APP_API_URL}/flashcards/${flashcardId}/attempts`, {
        isCorrect,
        userId: state.user?.id
      });
    }
  }
})
