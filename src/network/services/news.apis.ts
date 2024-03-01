import axios from 'axios';
import Config from 'react-native-config';

export const getListNews = (params: any) => {
  return axios.get(
    `https://newsapi.org/v2/top-headlines?${params}&apiKey=${Config.NEWS_API_KEY}`,
  );
};
