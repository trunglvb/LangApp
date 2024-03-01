import apiClient from '../client';

export const getAllLessonStatus = () => {
  return apiClient.get('/all-lesson-status');
};
