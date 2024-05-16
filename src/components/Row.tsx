import React, { forwardRef, FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Movie, MovieList } from "../api/MovieDTO";
import { pipe } from "../utils/fp";
import Loading from "./Loading";
import styled from "styled-components";
import Poster from "./Poster";
import { breakpoints } from "../styles/media";

interface Props {
  title: string;
  id: string;
  fetchClosure: () => Promise<MovieList>;
}

const Row: FunctionComponent<Props> = ({ title, id, fetchClosure }) => {
  const [movies, setMovies] = useState<Movie[]>();
  const posterContainer = useRef<HTMLDivElement>(null);

  const getMovies = useCallback(() => {
    const getMovies = (movieList: MovieList) => movieList.results;
    return pipe(fetchClosure, getMovies, setMovies);
  }, [fetchClosure, setMovies]);

  const scrollLeft = useCallback(() => {
    if (posterContainer.current) {
      posterContainer.current.scrollLeft += posterContainer.current.clientWidth;
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (posterContainer.current) {
      posterContainer.current.scrollLeft -= posterContainer.current.clientWidth;
    }
  }, []);

  useEffect(() => {
    try {
      getMovies()();
    } catch (error) {
      console.error(error);
    }
  }, [getMovies]);

  return movies ? (
    <Container>
      <Title>{title}</Title>
      <SliderArrow direction="left" clickHandler={scrollRight} />
      <PosterContainer ref={posterContainer} id={id}>
        {movies?.map((movie) => <Poster key={movie.id} className="row__poster" movie={movie} />)}
      </PosterContainer>
      <SliderArrow direction="right" clickHandler={scrollLeft} />
    </Container>
  ) : (
    <Container>
      <Loading />
    </Container>
  );
};

export default Row;

const Container = styled.section`
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 3rem 0 1rem;
`;

type Direction = "left" | "right";

interface SliderProps {
  direction: Direction;
  clickHandler: () => void;
}

const SliderArrow: FunctionComponent<SliderProps> = ({ direction, clickHandler }) => {
  return (
    <Slider>
      {direction === "left" ? (
        <LeftArrowContainer onClick={clickHandler}>
          <Arrow>{"<"}</Arrow>
        </LeftArrowContainer>
      ) : (
        <RightArrowContainer onClick={clickHandler}>
          <Arrow>{">"}</Arrow>
        </RightArrowContainer>
      )}
    </Slider>
  );
};

const Slider = styled.div.attrs({ className: "slider" })`
  ${breakpoints.small} {
    display: none;
  }
`;

const ArrowContainer = styled.div`
  background-clip: content-box;
  background: transparent;
  padding: 20px 0;
  box-sizing: border-box;
  transition: 0.4s all ease-in-out;
  cursor: pointer;
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 9;

  &:hover {
    background: rgba(20, 20, 20, 0.5);
    opacity: 1;

    .arrow {
      transform: scale(1.5);
    }
  }
`;

const LeftArrowContainer = styled(ArrowContainer).attrs({ className: "slider__arrow-left" })`
  position: absolute;
  top: 0;
  left: 0;
`;
const RightArrowContainer = styled(ArrowContainer).attrs({ className: "slider__arrow-right" })`
  position: absolute;
  top: 0;
  right: 0;
`;

const Arrow = styled.span.attrs({ className: "arrow" })`
  transition: 0.4s all ease-in-out;
  user-select: none;
`;

const Posters = styled.div.attrs({ className: "row__posters" })`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface PosterContainerProps {
  id: string;
  children: React.ReactNode;
}

const PosterContainer = forwardRef<HTMLDivElement, PosterContainerProps>(({ id, children }, ref) => {
  return (
    <Posters ref={ref} id={id}>
      {children}
    </Posters>
  );
});
