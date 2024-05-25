import { onRequest } from "firebase-functions/v2/https";
import { MovieDetail, MovieList } from "./MovieDTO";

/*
 * 리액트 프로젝트의 .env 말고 이 모듈의 .env 를 추가하고 TMDB_API_KEY 를 추가해야한다.
 * 해당 모듈은 리액트가 아니브로 변수 앞에 REACT_APP_ 을 추가할 필요가 없다.
 * */

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_PATH = {
  fetchNowPlaying: "/movie/now_playing",
  fetchTrending: "/trending/all/week",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
  fetchSearch: "/search/movie?include_adult=false",
};

const DEFAULT_PARAMS = {
  api_key: process.env.TMDB_API_KEY,
  language: "ko-KR",
} as Record<string, string>;

const fetchTmdb = <ReturnType>(url: string) =>
  onRequest(async (req, res) => {
    const params = req.query as Record<string, string>;
    const requestUrl = [DEFAULT_PARAMS, params].reduce(appendQuery, BASE_URL + url);

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (response.status !== 200) res.send(new TmdbAxiosError(data));
    else res.send(data as ReturnType);
  });

export const nowPlaying = fetchTmdb<MovieList>(TMDB_PATH.fetchNowPlaying);
export const trending = fetchTmdb<MovieList>(TMDB_PATH.fetchTrending);
export const topRated = fetchTmdb<MovieList>(TMDB_PATH.fetchTopRated);
export const actionMovies = fetchTmdb<MovieList>(TMDB_PATH.fetchActionMovies);
export const comedyMovies = fetchTmdb<MovieList>(TMDB_PATH.fetchComedyMovies);
export const search = fetchTmdb<MovieDetail>(TMDB_PATH.fetchSearch);

export const movieDetails = onRequest(async (req, res) => {
  const path = req.url;
  const requestUrl = [DEFAULT_PARAMS].reduce(appendQuery, BASE_URL + "/movie" + path);

  const response = await fetch(requestUrl);
  const data = await response.json();

  if (response.status !== 200) res.send(new TmdbAxiosError(data));
  else res.send(data as MovieDetail);
});

class TmdbAxiosError extends Error {
  constructor(props: any) {
    super(props);
    // send error log to server
    console.debug("서버로 에러 로그 전송");
  }
}

const appendQuery = (url: string, query: Record<string, string>): string => {
  const queryString = new URLSearchParams(query).toString();
  if (queryString === "") return url;

  const urlInstance = new URL(url);
  if (urlInstance.searchParams.size > 0) {
    return url + "&" + queryString;
  } else {
    return url + "?" + queryString;
  }
};
