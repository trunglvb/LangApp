import BaseResponse from '../../model/BaseResponse';
import {
  ISentenseReponse,
  ISentenseTotalReponse,
} from '../../model/SentenseModel';
import apiClient from '../client';

const getSentenceList = (
  page: number,
  perPage: number,
  topics: string | [],
) => {
  return apiClient.get<BaseResponse<ISentenseReponse>>('/sentence-list', {
    params: {
      page: page,
      perPage: perPage,
      topics: topics,
    },
  });
};

const getSentenceTotal = (topics: string | []) => {
  return apiClient.get<BaseResponse<ISentenseTotalReponse>>('/sentence-total', {
    params: {
      topics: topics,
    },
  });
};

const updateSentenceChecked = (sentenceId: string, isChecked: boolean) => {
  return apiClient.put(`/sentence/${sentenceId}`, {
    isChecked: isChecked,
  });
};

export {getSentenceList, updateSentenceChecked, getSentenceTotal};
