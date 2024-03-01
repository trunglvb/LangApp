import BaseResponse from '../../model/BaseResponse';
import {PodcastModel} from '../../model/PodcastModel';
import {PodcastLevel} from '../../model/enum/PodcastLevel';
import apiClient from '../client';

const getPodcastsByLevel = (level: PodcastLevel) => {
  return apiClient.get<BaseResponse<any>>(`/all-podcasts/?level=${level}`);
};

const updateProgressPodcast = (
  podcastId: string,
  currentProgress: number,
  podcastDuration: number,
) => {
  return apiClient.put<BaseResponse<PodcastModel>>(
    `/update-podcast-progress/${podcastId}`,
    {currentProgress, podcastDuration},
  );
};

const getRecentPodcast = () => {
  return apiClient.get('/recent-podcasts');
};

export {getPodcastsByLevel, updateProgressPodcast, getRecentPodcast};
