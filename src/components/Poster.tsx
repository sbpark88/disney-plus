import React, { FunctionComponent, useCallback } from "react";
import { Movie } from "../api/MovieDTO";
import styled from "styled-components";
import { breakpoints } from "../styles/media";

interface Props {
  className: string;
  movie: Movie;
}

const Poster: FunctionComponent<Props> = ({ className, movie }) => {
  const onImgClick = useCallback((event: React.MouseEvent<HTMLImageElement>) => {}, []);

  return (
    <Image
      className={className ?? "poster"}
      src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
      alt={movie.title}
      onClick={onImgClick}
    ></Image>
  );
};

export default Poster;

const Image = styled.img`
  width: 30vw;
  object-fit: contain;
  transition: all 0.4s;

  ${breakpoints.xLarge} {
    width: 400px;
  }
  ${breakpoints.small} {
    width: 70vw;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }

  &:hover {
    transform: scale(1.08);
  }
`;
