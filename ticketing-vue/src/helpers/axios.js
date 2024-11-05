import { API_URL } from '@/config';
import router from '@/router';
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token'); 
};

const apiClient = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config) => {
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

apiClient.interceptors.response.use(
  (response) => {
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
