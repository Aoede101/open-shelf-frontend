import api from './api';

export const discussionService = {
  getDiscussions: async () => {
    const response = await api.get('/discussions');
    return response.data;
  },

  getDiscussion: async (discussionId) => {
    const response = await api.get(`/discussions/${discussionId}`);
    return response.data;
  },

  getBookDiscussion: async (bookId) => {
    const response = await api.get(`/discussions/book/${bookId}`);
    return response.data;
  },

  joinDiscussion: async (bookId) => {
    const response = await api.post(`/discussions/book/${bookId}`);
    return response.data;
  },

  sendMessage: async (discussionId, content) => {
    const response = await api.post(`/discussions/${discussionId}/messages`, { content });
    return response.data;
  },

  deleteMessage: async (discussionId, messageId) => {
    const response = await api.delete(`/discussions/${discussionId}/messages/${messageId}`);
    return response.data;
  },
};