import {Theme} from '@epubjs-react-native/core';

export interface IChoseColor {
  setTheme: (theme: Theme) => void;
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

export interface IChoseFont {
  changeFontFamily: (fontFamily: string) => void;
  setFontFamily: (fontFamily: string) => void;

  fontFamily: string;
}

export interface ISearch {
  theme: Theme;

  term: string;
  setTerm: (term: string) => void;
  search: (term: string) => void;
  searchResults: {cfi: string; excerpt: string}[];
  goToLocation: (location: string) => void;
}
export interface IToc {
  toc: {label: string; id: string; href: string}[];
  goToLocation: (location: string) => void;
  theme: Theme;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
