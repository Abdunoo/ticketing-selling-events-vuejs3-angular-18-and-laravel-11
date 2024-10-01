import { API_URL } from '@/config';
import router from '@/router';
import axios from 'axios';

// Function untuk mendapatkan token, ganti dengan logika Anda
const getToken = () => {
  return localStorage.getItem('token'); // Contoh: token disimpan di localStorage
};

// Buat instance axios dengan konfigurasi default
const apiClient = axios.create({
  baseURL: API_URL, // Ganti dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  }
});

// Tambahkan request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Periksa apakah config.headers.skipToken diset ke true
    if (!config.headers.skipToken) {
      const token = getToken();
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tambahkan response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return langsung data dari response
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect ke halaman login jika error 401 Unauthorized
      router.push('/login');
    }    
    return Promise.reject(error);
  }
);

export default apiClient;
