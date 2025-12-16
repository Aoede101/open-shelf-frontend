import api from './api';

export const bookService = {
  getBooks: async (params = {}) => {
    const response = await api.get('/books', { params });
    return response.data;
  },

  getBook: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  uploadBook: async (formData) => {
    // FormData for file uploads
    const response = await api.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  downloadBook: async (id) => {
    const response = await api.post(`/books/${id}/download`);
    return response.data;
  },
};