import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

let toastHandler = null;
export const registerToastHandler = (fn) => { toastHandler = fn; };

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
      if (toastHandler) {
        if (status >= 500) toastHandler('Server error. Please try again later.', 'error');
        else if (status === 403) toastHandler('You do not have permission for this action.', 'error');
      }
    } else if (error.request) {
      console.error('No response from server. Check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
