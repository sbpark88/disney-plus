import { Movie, MovieDetail, MovieList } from "./MovieDTO";
import { AxiosResponse } from "axios";
import $axios from "./axios";

const URL = {
  fetchNowPlaying: "/movie/now_playing",
  fetchTrending: "/trending/all/week",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
};

export const fetchNowPlaying = async (): Promise<MovieList> => {
  const response: AxiosResponse<MovieList> = await $axios.get<MovieList>(URL.fetchNowPlaying);
  if (response.status !== 200) throw new TmdbAxiosError(response);
  return response.data;
};

export const fetchMovieDetails = async (movie: Movie): Promise<MovieDetail> => {
  const { data: movieDetail } = await $axios.get<MovieDetail>(`movie/${movie.id}`, {
    params: { append_to_response: "videos" },
  });
  return movieDetail;
};

class TmdbAxiosError extends Error {
  constructor(props: any) {
    super(props);
    // send error log to server
  }
}
