import { defineStore } from 'pinia';
import { api } from './api';

export interface User { id: string; name: string; age?: number; createdAt: string; }

export const useUserStore = defineStore('userStore', {
  state: () => ({ users: [] as User[], activeUser: null as User | null }),
  actions: {
    async fetchUsers() { const { data } = await api.get<User[]>('/users'); this.users = data; },
    async createUser(name: string, age?: number) { const { data } = await api.post<User>('/users', { name, age }); this.users.push(data); this.activeUser = data; },
    setActive(id: string) { this.activeUser = this.users.find(u => u.id === id) || null; }
  }
});
