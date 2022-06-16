import { defineStore } from 'pinia';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';

import type { ProfileState, UserData } from './types';

export const useProfileStore = defineStore({
  id: 'profile',

  state: (): ProfileState => ({
    userId: '999'
  }),

  getters: {
    isUserExist(): boolean {
      return Boolean(this.userId);
    }
  },

  actions: {
    setCurrentUser({ userId, access, refresh }: UserData): void {
      this.userId = userId;
      if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
      if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    },

    logout(): void {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      this.$reset();
    }
  }
});
