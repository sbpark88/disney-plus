import axios, { AxiosInstance } from "axios";

const $axios: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "ko-KR",
  },
});

export default $axios;
