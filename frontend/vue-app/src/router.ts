import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FlashcardPlay from './components/FlashcardPlay.vue';
import DeckBuilder from './components/DeckBuilder.vue';
import WordsList from './components/WordsList.vue';
import StatsDashboard from './components/StatsDashboard.vue';
import UserProfile from './components/UserProfile.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/play' },
  { path: '/play', component: FlashcardPlay },
  { path: '/decks', component: DeckBuilder },
  { path: '/words', component: WordsList },
  { path: '/stats', component: StatsDashboard },
  { path: '/user', component: UserProfile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
