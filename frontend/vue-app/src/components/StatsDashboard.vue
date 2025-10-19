<template>
  <div class="stats">
    <h2>Stats</h2>
    <div v-if="stats">
      <p>Accuracy: {{ stats.accuracyPercent }}%</p>
      <p>Total Words Seen: {{ stats.totalWordsSeen }}</p>
      <p>Learned Words: {{ stats.learnedWords.length }}</p>
      <p>Needs Revision: {{ stats.wordsNeedingRevision.length }}</p>
      <h3>Deck Accuracy</h3>
      <ul>
        <li v-for="d in stats.perDeckAccuracy" :key="d.deckId">{{ d.deckId }}: {{ d.accuracy }}%</li>
      </ul>
    </div>
    <div v-else><p>No stats yet.</p></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useStatsStore } from '../stores/statsStore';

const user = useUserStore();
const statsStore = useStatsStore();
const stats = computed(() => statsStore.stats);

onMounted(() => { if (user.activeUser) statsStore.fetchStats(user.activeUser.id); });
</script>
<style scoped>
.stats { max-width:500px; margin:1rem auto; }
</style>
