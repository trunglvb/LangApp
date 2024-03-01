export interface ISentenseModel {
  _id: string;
  sentence: string;
  mean: string;
  note: string;
  topics: string[];
  isChecked: boolean;
}
export interface ISentenseReponse {
  sentenceList: ISentenseModel;
}
export interface ITopicModel {
  key: string;
  title: string;
}
export interface ISentenseTotalReponse {
  total: number;
}
