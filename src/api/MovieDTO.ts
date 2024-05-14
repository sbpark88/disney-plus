export interface MovieList {
  [key: string]: unknown;
  dates: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  [key: string]: unknown;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail {
  [key: string]: unknown;
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any; // 현재 null일 수도 있으므로 any로 설정
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  videos: Videos | null;
  vote_average: number;
  vote_count: number;
}

interface Dates {
  maximum: string;
  minimum: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  [key: string]: string;
  name: string;
}

interface SpokenLanguage {
  [key: string]: string;
  english_name: string;
  name: string;
}

interface Videos {
  results: VideoResults[];
}

interface VideoResults {
  [key: string]: unknown;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
