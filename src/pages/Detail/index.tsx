import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../api/MovieDTO";
import { fetchMovieDetails } from "../../api/request";
import { pipe } from "../../utils/fp";
import styled from "styled-components";
import $K from "../../constants";

const DetailPage: React.FC = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie>();

  const getMovie = useCallback(() => {
    return pipe(fetchMovieDetails, setMovie);
  }, []);

  useEffect(() => {
    getMovie()(movieId);
  }, [getMovie, movieId]);

  return (
    <Poster>
      <img src={$K.Url.PosterOriginal + movie?.backdrop_path} alt="poster" className="modal__poster-img" />
    </Poster>
  );
};

export default DetailPage;

const Poster = styled.section`
  img {
    position: fixed;
    width: 100%;
  }
`;
