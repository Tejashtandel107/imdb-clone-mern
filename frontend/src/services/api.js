import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Movies API
export const moviesAPI = {
  getMovies: (params) => api.get('/movies', { params }),
  searchMovies: (query, params) => api.get('/movies/search', { params: { q: query, ...params } }),
  getMovie: (id) => api.get(`/movies/${id}`),
  createMovie: (data) => api.post('/movies', data),
  updateMovie: (id, data) => api.put(`/movies/${id}`, data),
  deleteMovie: (id) => api.delete(`/movies/${id}`),
};

export default api;
