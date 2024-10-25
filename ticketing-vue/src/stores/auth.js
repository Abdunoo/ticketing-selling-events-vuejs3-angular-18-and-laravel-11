// stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    redirectPath: '/', // Default path after login if none is set
  }),
  actions: {
    checkLogin() {
      const isLogin = localStorage.getItem('isLogin') === 'true';
      this.isLogin = isLogin;
    },
    setLoginState(status) {
      this.isLogin = status;
      localStorage.setItem('isLogin', status);
    },
    setRedirectPath(path) {
      this.redirectPath = path;
      localStorage.setItem('redirectPath', path); // Persist the intended path
    },
    getRedirectPath() {
      return localStorage.getItem('redirectPath') || this.redirectPath;
    },
    clearRedirectPath() {
      // this.redirectPath = '/';
      localStorage.removeItem('redirectPath');
    },
  },
});
