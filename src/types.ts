export interface IMovieResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieData {
  Search?: IMovieResult[];
  totalResults?: string;
  Response?: string;
  Error?: string;
}
