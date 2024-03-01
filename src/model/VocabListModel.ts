export interface VocabListModel {
  topicTitle: string;
  videoSrc: string;
  wordList: VocabModel[];
  _id: string;
}

export interface VocabModel {
  _id: string;
  word: string;
  meaning: string;
  image: string;
  audio: string;
  spell: string;
}
