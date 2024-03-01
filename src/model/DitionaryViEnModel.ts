export interface IDataWordDetails {
  partOfSpeech: string,
  meanings: { definition: string, details: { detail: string }[] }[]
}

export interface IWordDetails {
  data: IDataWordDetails[],
  _id: string,
  word: string,
  spell: string
}

export interface IWordDetailsResponse {
  word: IWordDetails[]
}

export interface ITranslationParams {
  text: string
}