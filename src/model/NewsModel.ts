export interface Source {
  id?: any;
  name: string;
}

export interface NewsModel {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}
