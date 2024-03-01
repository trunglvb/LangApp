import apiClient from '../client';

export function getAllVocabLists() {
  return apiClient.get('/all-vocab-lists');
}

export function addMyWord(params: any) {
  return apiClient.post('/add-new-vocab', params);
}
