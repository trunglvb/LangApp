export interface IGameModel {
  type: string;
  level: string;
  specialty: string;
  topics: string[];
  n: number;
}

export interface IWrongList {
  word: string;
  phonetic: string;
}

export interface ICorrectGameModel {
  word: string;
  mean: string;
  phonetic: string;
  picture: string;
  wrongList: IWrongList[];
}

export interface ICorrectGameResponse {
  wordPack: ICorrectGameModel[];
}

export interface IMatchGameModel {
  word: string;
  mean: string;
  picture: string;
}
export interface IMatchGameResponse {
  wordPack: IMatchGameModel[];
}
