import { api } from '@/lib/api';

export const coursesService = {
  getCourse: async () => {
    const response = await api.get('/courses/');
    return response.data.results || response.data;
  },

  createStudent: async (data) => {
    const response = await api.post('/students/', data);
    return response.data;
  },
};
