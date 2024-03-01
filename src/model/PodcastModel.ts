export interface PodcastModel {
  _id: string;
  title: string;
  coverImage: string;
  detailLink: string;
  detail: {
    audioLink: string;
    transcriptItems: {
      person: string;
      speech: string;
    }[];
  };
  description: string;
  level: string;
  currentProgress: number;
  podcastDuration: number;
}
