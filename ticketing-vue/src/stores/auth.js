// src/stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios'; // Assuming you're using Axios for API requests

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('access_token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUser: (state) => state.user,
  },
  actions: {

    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials); // Replace with your API login endpoint
        this.user = response.data.user;
        this.accessToken = response.data.access_token;

        // Store access token in local storage for persistence
        localStorage.setItem('access_token', this.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      } catch (error) {
        console.error('Login failed:', error);
        throw error; // Rethrow the error for handling in the component
      }
    },

    async loginWithGoogle(googleUser) {
      try {
        const idToken = googleUser.getAuthResponse().id_token;
        const response = await axios.post('/api/google-login', { idToken }); // Replace with your Google login API endpoint

        this.user = response.data.user;
        this.accessToken = response.data.access_token;

        // Store access token in local storage for persistence
        localStorage.setItem('access_token', this.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      } catch (error) {
        console.error('Google login failed:', error);
        throw error;
      }
    },

    async fetchUser() {
      if (!this.accessToken) return;

      try {
        const response = await axios.get('/api/user'); // Replace with your API user info endpoint
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.logout(); // Logout in case of an error (e.g., token expired)
      }
    },
  },
});
