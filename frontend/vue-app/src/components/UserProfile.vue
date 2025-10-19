<template>
  <div class="user-profile">
    <h2>User</h2>
    <form @submit.prevent="create">
      <input v-model="name" placeholder="Name" />
      <input v-model.number="age" type="number" min="1" placeholder="Age" />
      <button>Create User</button>
    </form>
    <div>
      <h3>Users</h3>
      <ul>
        <li v-for="u in userStore.users" :key="u.id">
          <button @click="select(u.id)">{{ u.name }} ({{ u.age ?? '-' }})</button>
        </li>
      </ul>
    </div>
    <div v-if="userStore.activeUser" class="active">Active: {{ userStore.activeUser.name }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const name = ref('');
const age = ref<number | undefined>(undefined);
function create() { if(!name.value) return; userStore.createUser(name.value, age.value); name.value=''; age.value=undefined; }
function select(id: string) { userStore.setActive(id); }
onMounted(() => userStore.fetchUsers());
</script>
<style scoped>
.user-profile { max-width:400px; margin:1rem auto; }
form { display:flex; gap:.5rem; margin-bottom:1rem; }
ul { list-style:none; padding:0; }
.active { margin-top:1rem; font-weight:bold; }
</style>
