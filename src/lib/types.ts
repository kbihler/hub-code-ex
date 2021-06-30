export enum FilterTypes {
  YEAR = "year",
  GENRE = "genre",
  TYPE = "type",
  CLEAR = "clear",
}

export interface Media {
  media: Item[];
}

export interface Item {
  title: string;
  year: number;
  type: string;
  poster: string;
  genre: string[];
  clear: string;
}
