// Libraries
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchExpenseTeams = () => {
  return api.get('/team/list');
};

export const fetchExpenseApprovers = () => {
  return api.get('/user/approvers');
};

export const fetchExpenseRequestors = () => {
  return api.get('/user/requestors');
};

export const fetchExpenseTypes = () => {
  return api.get('/expense/types');
};

export const fetchExpenseStatuses = () => {
  return api.get('/expense/statuses');
};
