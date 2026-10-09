import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        window.location.href = '/login';
      } else if (status === 403) {
        console.error('Access denied: insufficient permissions.');
      } else if (status >= 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      console.error('No response from server. Check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
