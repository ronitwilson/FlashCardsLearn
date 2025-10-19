<template>
  <div class="app-container">
    <header>
      <h1>Sight Words Flashcards</h1>
      <nav class="nav">
        <RouterLink to="/play">Play</RouterLink>
        <RouterLink to="/decks">Decks</RouterLink>
        <RouterLink to="/words">Words</RouterLink>
        <RouterLink to="/stats">Stats</RouterLink>
        <RouterLink to="/user">User</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
<script setup lang="ts">
// using vue-router globally registered components RouterLink & RouterView
</script>
<style>
body,html { margin:0; font-family: system-ui, sans-serif; }
.app-container { padding: 0 1rem; }
header { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; }
.nav a { margin-right:.75rem; text-decoration:none; padding: .35rem .6rem; border-radius:4px; background:#f0f0f0; color:#333; }
.nav a.router-link-active { background:#333; color:#fff; }
button { cursor:pointer; }
</style>
