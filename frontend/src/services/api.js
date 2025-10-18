import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor
    this.api.interceptors.request.use(
      config => {
        console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`)
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      response => {
        return response
      },
      error => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  // User endpoints
  async getUsers() {
    const response = await this.api.get('/users')
    return response.data
  }

  async getUserById(id) {
    const response = await this.api.get(`/users/${id}`)
    return response.data
  }

  async createUser(userData) {
    const response = await this.api.post('/users', userData)
    return response.data
  }

  async updateUser(id, userData) {
    const response = await this.api.patch(`/users/${id}`, userData)
    return response.data
  }

  async deleteUser(id) {
    await this.api.delete(`/users/${id}`)
  }

  // Deck endpoints
  async getDecks() {
    const response = await this.api.get('/decks')
    return response.data
  }

  async getDeckById(id) {
    const response = await this.api.get(`/decks/${id}`)
    return response.data
  }

  async getDecksByUser(userId) {
    const response = await this.api.get(`/decks/user/${userId}`)
    return response.data
  }

  async createDeck(deckData) {
    const response = await this.api.post('/decks', deckData)
    return response.data
  }

  async updateDeck(id, deckData) {
    const response = await this.api.patch(`/decks/${id}`, deckData)
    return response.data
  }

  async deleteDeck(id) {
    await this.api.delete(`/decks/${id}`)
  }

  // Flashcard endpoints
  async getFlashcards() {
    const response = await this.api.get('/flashcards')
    return response.data
  }

  async getFlashcardById(id) {
    const response = await this.api.get(`/flashcards/${id}`)
    return response.data
  }

  async getFlashcardsByDeck(deckId) {
    const response = await this.api.get(`/flashcards/deck/${deckId}`)
    return response.data
  }

  async createFlashcard(flashcardData) {
    const response = await this.api.post('/flashcards', flashcardData)
    return response.data
  }

  async updateFlashcard(id, flashcardData) {
    const response = await this.api.patch(`/flashcards/${id}`, flashcardData)
    return response.data
  }

  async deleteFlashcard(id) {
    await this.api.delete(`/flashcards/${id}`)
  }

  // Attempt endpoints
  async createAttempt(attemptData) {
    const response = await this.api.post('/flashcards/attempts', attemptData)
    return response.data
  }

  async getAttemptsByUser(userId) {
    const response = await this.api.get(`/flashcards/attempts/user/${userId}`)
    return response.data
  }

  async getAttemptsByFlashcard(flashcardId) {
    const response = await this.api.get(`/flashcards/attempts/flashcard/${flashcardId}`)
    return response.data
  }

  // Progress endpoints
  async getUserProgress(userId) {
    const response = await this.api.get(`/progress/user/${userId}`)
    return response.data
  }

  async getDeckProgress(deckId, userId) {
    const response = await this.api.get(`/progress/deck/${deckId}/user/${userId}`)
    return response.data
  }

  async getDifficultWords(userId, limit = 10) {
    const response = await this.api.get(`/progress/user/${userId}/difficult-words?limit=${limit}`)
    return response.data
  }
}

export default new ApiService()
