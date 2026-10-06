import api from '../utils/api';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (data) => {
  return api.post('/auth/register', data);
};
