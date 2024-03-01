import apiClient from '../client';

const getAllBooks = () => {
  return apiClient.get('/all-books');
};

const getBookDetail = (id: string) => {
  return apiClient.get(`/book-detail/${id}`);
};

const updateBookPosition = (
  bookId: string,
  currentPosition: number,
  totalPosition: number,
) => {
  return apiClient.put(`/update-position/${bookId}`, {
    currentPosition: currentPosition,
    totalPosition: totalPosition,
  });
};

const uploadBook = (body: any) => {
  return apiClient.post('/upload', body);
};

export {getAllBooks, getBookDetail, updateBookPosition, uploadBook};
