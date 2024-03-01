import apiClient from '../client';

export const getEnEnWordsDetails = (word: string) => {
  return apiClient.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );
};
