<template>
  <div v-if="currentWord" class="flashcard">
    <div class="word">{{ currentWord.text }}</div>
    <div class="actions">
      <button @click="mark(true)">I Know This (Space/Enter)</button>
      <button @click="mark(false)">Don't Know (Esc)</button>
    </div>
    <div class="progress">Card {{ index + 1 }} / {{ deckSize }}</div>
  </div>
  <div v-else>
    <p>No deck loaded. Generate one in Decks tab.</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePlayStore } from '../stores/playStore';
import { useWordsStore } from '../stores/wordsStore';
import { useAttemptsStore } from '../stores/attemptsStore';
import { useUserStore } from '../stores/userStore';

const play = usePlayStore();
const attempts = useAttemptsStore();
const user = useUserStore();
const wordsStore = useWordsStore();

const currentWord = ref<any>(null);
const index = ref(0);
const deckSize = ref(0);

function refresh() {
  const deckWords = play.currentDeckWords;
  deckSize.value = deckWords.length;
  currentWord.value = deckWords[index.value];
}

function advance() {
  index.value++;
  if (index.value >= deckSize.value) {
    currentWord.value = null;
  } else {
    refresh();
  }
}

function mark(isCorrect: boolean) {
  if (!currentWord.value || !user.activeUser) return;
  attempts.recordAttempt(user.activeUser.id, currentWord.value.id, play.currentDeckId, isCorrect);
  advance();
}

onMounted(() => {
  refresh();
  window.addEventListener('keydown', e => {
    if (!currentWord.value) return;
    if (e.code === 'Space' || e.code === 'Enter') { mark(true); }
    if (e.code === 'Escape') { mark(false); }
  });
});
</script>
<style scoped>
.flashcard { border:1px solid #ccc; padding:2rem; text-align:center; max-width:400px; margin:1rem auto; border-radius:8px; }
.word { font-size:3rem; margin-bottom:1rem; }
.actions button { margin:0 .5rem; }
.progress { margin-top:1rem; font-size:.9rem; color:#666; }
</style>
