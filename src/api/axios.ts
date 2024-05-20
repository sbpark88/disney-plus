import axios, { AxiosInstance } from "axios";

export const defaultParams = {
  api_key: process.env.REACT_APP_TMDB_API_KEY,
  language: "ko-KR",
};

const $axios: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: defaultParams,
});

export default $axios;
