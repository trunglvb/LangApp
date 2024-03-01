import apiClient, {http} from '../client';
import {
  ITranslationParams,
  IWordDetailsResponse,
} from '../../model/DitionaryViEnModel';
import BaseResponse from '../../model/BaseResponse';

export const getListWords = (word: string) => {
  return http.get<BaseResponse<IWordDetailsResponse>>(`/word-vien/${word}`);
};
export const getWordsDetails = (word: string) => {
  return apiClient.get<BaseResponse<any>>(`/word-details/${word}`);
};

export const getTranslationViEn = (params: ITranslationParams) => {
  return http.post('/translation/vi-en', params);
};

export const getTranslationEnVi = (params: ITranslationParams) => {
  return http.post('/translation/en-vi', params);
};
