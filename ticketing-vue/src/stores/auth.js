import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    redirectPath: '/', 
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
      localStorage.setItem('redirectPath', path); 
    },
    getRedirectPath() {
      return localStorage.getItem('redirectPath') || this.redirectPath;
    },
    clearRedirectPath() {
      localStorage.removeItem('redirectPath');
    },
  },
});
