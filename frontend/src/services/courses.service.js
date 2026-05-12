import { api } from '@/lib/api';

export const coursesService = {
  getCourse: async () => {
    const response = await api.get('/courses/');
    return response.data.results || response.data;
  },

  createCourse: async (data) => {
    const response = await api.post('/courses/', data);
    return response.data;
  },

  updateCourse: async (id, data) => {
    const response = await api.patch(`/courses/${id}/`, data);
    return response.data;
  },

};
