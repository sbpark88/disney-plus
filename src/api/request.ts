import { MovieDetail, MovieList } from "./MovieDTO";
import axios from "axios";

// firebase functions 의 local 주소는 `npm run start:functions`를 사용해 서버를 띄우면 확인할 수 있다.

const URL = {
  fetchNowPlaying: "/nowPlaying",
  fetchTrending: "/trending",
  fetchTopRated: "/topRated",
  fetchActionMovies: "/actionMovies",
  fetchComedyMovies: "/comedyMovies",
  fetchHorrorMovies: "/horrorMovies",
  fetchRomanceMovies: "/romanceMovies",
  fetchDocumentaries: "/documentaries",
  fetchSearch: "/search",
  movieDetails: "/movieDetails",
};

const fetchTmdb =
  <ReturnType>(url: string) =>
  async (params?: Record<string, string>) => {
    const response = await axios<ReturnType>(process.env.REACT_APP_FIREBASE_FUNCTION_URL + url, { params });

    if (response.status !== 200) throw new TmdbAxiosError(response);
    return response.data;
  };

export const fetchNowPlaying = fetchTmdb<MovieList>(URL.fetchNowPlaying);
export const fetchTrending = fetchTmdb<MovieList>(URL.fetchTrending);
export const fetchTopRated = fetchTmdb<MovieList>(URL.fetchTopRated);
export const fetchActionMovies = fetchTmdb<MovieList>(URL.fetchActionMovies);
export const fetchComedyMovies = fetchTmdb<MovieList>(URL.fetchComedyMovies);
export const fetchSearch = fetchTmdb<MovieDetail>(URL.fetchSearch);

export const fetchMovieDetails = async (movieId: string | number): Promise<MovieDetail> => {
  return await fetchTmdb<MovieDetail>(`${URL.movieDetails}/${movieId}`)();
};

class TmdbAxiosError extends Error {
  constructor(props: any) {
    super(props);
    // send error log to server
    console.debug("서버로 에러 로그 전송");
  }
}
