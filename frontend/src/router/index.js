import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Flashcards from '../views/Flashcards.vue'
import Decks from '../views/Decks.vue'
import Progress from '../views/Progress.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/flashcards',
    name: 'Flashcards',
    component: Flashcards
  },
  {
    path: '/decks',
    name: 'Decks',
    component: Decks
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
