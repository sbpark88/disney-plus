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

const fetchTmdb =
  <ReturnType>(url: string) =>
  async () => {
    const response: AxiosResponse<ReturnType> = await $axios.get<ReturnType>(url);
    if (response.status !== 200) throw new TmdbAxiosError(response);
    return response.data;
  };

export const fetchNowPlaying = fetchTmdb<MovieList>(URL.fetchNowPlaying);
export const fetchTrending = fetchTmdb<MovieList>(URL.fetchTrending);
export const fetchTopRated = fetchTmdb<MovieList>(URL.fetchTopRated);
export const fetchActionMovies = fetchTmdb<MovieList>(URL.fetchActionMovies);
export const fetchComedyMovies = fetchTmdb<MovieList>(URL.fetchComedyMovies);

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
    console.debug("서버로 에러 로그 전송");
  }
}
