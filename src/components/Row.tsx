import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Movie, MovieList } from "../api/MovieDTO";
import { pipe } from "../utils/fp";
import Loading from "./Loading";
import styled from "styled-components";
import Poster from "./Poster";
import { TitleH2 } from "./Atomic";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

interface Props {
  title: string;
  id: string;
  fetchClosure: () => Promise<MovieList>;
}

const Row: FunctionComponent<Props> = ({ title, id, fetchClosure }) => {
  const [movies, setMovies] = useState<Movie[]>();

  const getMovies = useCallback(() => {
    const getMovies = (movieList: MovieList) => movieList.results;
    return pipe(fetchClosure, getMovies, setMovies);
  }, [fetchClosure, setMovies]);

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
      <Swiper
        id={id}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode]}
        loop={true}
        spaceBetween={26}
        slidesPerView={"auto"}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        freeMode={{
          enabled: true,
        }}
        style={{
          padding: "10px 0 40px",
        }}
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id} style={{ width: "auto" }}>
            <Poster className="row__poster" movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
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

const Title = styled(TitleH2)`
  margin: 3rem 0 1rem;
`;
