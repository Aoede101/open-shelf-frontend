import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  addToFavorites: async (bookId) => {
    const response = await api.post(`/users/favorites/${bookId}`);
    return response.data;
  },

  removeFromFavorites: async (bookId) => {
    const response = await api.delete(`/users/favorites/${bookId}`);
    return response.data;
  },
};
