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
    const token = getToken();
    if (!config.headers.skipToken && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Check if the method is PUT and data is FormData
    if (config.method === 'put' && config.data instanceof FormData) {
      // Override method to POST with `_method=PUT` in data to simulate a PUT request
      config.method = 'post';
      config.data.append('_method', 'PUT');
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
      // Redirect to login page if 401 Unauthorized error occurs
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
