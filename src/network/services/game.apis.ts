import BaseResponse from '../../model/BaseResponse';
import {ICorrectGameResponse} from '../../model/Game';
import apiClient from '../client';

const getQuestionCorrectGameList = (
  type: string,
  level: string,
  specialty: string,
  topics: string | [],
  n: number,
) => {
  return apiClient.get<BaseResponse<ICorrectGameResponse>>(
    '/correct-word/pack',
    {
      params: {
        type: type,
        level: level,
        specialty: specialty,
        topics: topics,
        nQuestion: n,
      },
    },
  );
};

const getQuestionMatchGameList = (
  type: string,
  level: string,
  specialty: string,
  topics: string | [],
  n: number,
) => {
  return apiClient.get<BaseResponse<ICorrectGameResponse>>('/word-match/pack', {
    params: {
      type: type,
      level: level,
      specialty: specialty,
      topics: topics,
      nQuestion: n,
    },
  });
};

export {getQuestionCorrectGameList, getQuestionMatchGameList};
