// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    checkLogin() {
      const isLogin = localStorage.getItem('isLogin') === 'true';
      this.isLogin = isLogin;
    },
    setLoginState(status) {
      this.isLogin = status;
    },
  },
});
