<template>
  <div class="words-list">
    <h2>Words</h2>
    <form @submit.prevent="addWord">
      <input v-model="text" placeholder="New word" />
      <button>Add</button>
    </form>
    <ul>
      <li v-for="w in wordsStore.words" :key="w.id">{{ w.text }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWordsStore } from '../stores/wordsStore';

const wordsStore = useWordsStore();
const text = ref('');
function addWord() { if(!text.value) return; wordsStore.addWord(text.value); text.value=''; }
onMounted(() => wordsStore.fetchWords());
</script>
<style scoped>
.words-list { max-width:400px; margin:1rem auto; }
form { display:flex; gap:.5rem; margin-bottom:1rem; }
ul { list-style:none; padding:0; }
li { padding:.25rem 0; }
</style>
