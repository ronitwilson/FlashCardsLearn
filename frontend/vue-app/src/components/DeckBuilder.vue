<template>
  <div class="deck-builder">
    <h2>Deck Builder</h2>
    <form @submit.prevent="createManual">
      <input v-model="deckName" placeholder="Deck name" />
      <button>Create Empty Deck</button>
    </form>
    <form @submit.prevent="generate">
      <input type="number" v-model.number="size" min="1" placeholder="Size" />
      <button>Generate Deck</button>
    </form>
    <div class="list">
      <h3>Decks</h3>
      <ul>
        <li v-for="d in decksStore.decks" :key="d.id">
          <button @click="loadDeck(d.id)">{{ d.name }} ({{ d.wordIds.length }} words)</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDecksStore } from '../stores/decksStore';
import { usePlayStore } from '../stores/playStore';

const decksStore = useDecksStore();
const play = usePlayStore();

const deckName = ref('');
const size = ref(5);

function createManual() {
  if (!deckName.value) return;
  decksStore.createDeck(deckName.value);
  deckName.value='';
}
function generate() { decksStore.generateDeck(size.value); }
function loadDeck(id: string) { play.loadDeck(id); }

onMounted(() => decksStore.fetchDecks());
</script>
<style scoped>
.deck-builder { max-width:600px; margin:1rem auto; }
form { margin-bottom:1rem; display:flex; gap:.5rem; }
.list ul { list-style:none; padding:0; }
.list li { margin:.25rem 0; }
</style>
