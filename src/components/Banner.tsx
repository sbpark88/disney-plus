import React, { useCallback, useEffect, useState } from "react";
import { Movie, MovieDetail, MovieList } from "api/MovieDTO";
import { fetchMovieDetails, fetchNowPlaying } from "api/request";
import { pipe } from "utils/fp";
import { breakpoints } from "styles/media";
import styled from "styled-components";
import Loading from "./Loading";
import $K from "../constants";
import { TitleH1 } from "./Atomic";

const Banner = () => {
  const [movie, setMovie] = useState<MovieDetail>();
  const [youtubeId, setYoutubeId] = useState<string>();
  const [play, setPlay] = useState(false);

  const pickOneMovie = (movies: MovieList) => {
    if (movies === null) throw new Error("Banner error: no movies");

    const filteredMovies = movies.results.filter(({ title }) => title.match(/[가-힣]/) !== null);
    const count = filteredMovies.length;
    const randomIndex = Math.floor(Math.random() * count);
    return filteredMovies[randomIndex];
  };

  const getMovie = useCallback(() => {
    return pipe(fetchNowPlaying, pickOneMovie, (movie: Movie) => fetchMovieDetails(movie.id), setMovie);
  }, [setMovie]);

  const getRandomMovieOnNowPlaying = useCallback(async () => {
    try {
      await getMovie()();
    } catch (error) {
      console.error(error);
    }
  }, [getMovie]);

  useEffect(() => {
    const youtubeId = movie?.videos?.results[0]?.key;
    if (youtubeId !== undefined) setYoutubeId(youtubeId);
  }, [movie]);

  useEffect(() => {
    getRandomMovieOnNowPlaying();
  }, [getRandomMovieOnNowPlaying]);

  const closeYoutube = useCallback((event: React.MouseEvent<unknown>) => {
    setPlay(false);
  }, []);

  return movie ? (
    <Header $movie={movie}>
      <Contents>
        <Title>{movie?.title ?? movie?.original_title}</Title>
        <ButtonWrapper>
          {movie?.videos?.results[0]?.key && <PlayButton onClick={() => setPlay(true)}>Play</PlayButton>}
        </ButtonWrapper>
        <Description>{ellipsis(movie?.overview)}</Description>
      </Contents>
      <FadeBottom />
      <YoutubeContainer $play={play}>
        {youtubeId && (
          <>
            <Youtube
              src={`https://www.youtube.com/embed/${youtubeId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${youtubeId}`}
              title="Youtube video player"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
            <CloseYoutube onClick={closeYoutube} />
          </>
        )}
      </YoutubeContainer>
    </Header>
  ) : (
    <EmptyContainer>
      <Loading width="10vw" />
    </EmptyContainer>
  );
};

export default Banner;

const ellipsis = (str?: string, to: number = 100): string => {
  if (str === undefined) return "";
  return str.length > to ? str.substring(0, to) + "..." : str;
};

const Header = styled.header.attrs({ className: "banner" })<{ $movie?: MovieDetail }>`
  position: relative;
  background-image: ${({ $movie }) => $movie && `url("${$K.Url.PosterOriginal}${$movie.backdrop_path}")`};
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 448px;

  ${breakpoints.xLarge} {
    height: 600px;
  }
  ${breakpoints.small} {
    background-image: ${({ $movie }) => $movie && `url("${$K.Url.PosterSmall}${$movie.backdrop_path}")`};
  }
`;

const EmptyContainer = styled(Header).attrs({ as: "div" })``;

const Contents = styled.div.attrs({ className: "banner__contents" })`
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;

  ${breakpoints.small} {
    padding: 100px 1rem 0;
    margin-left: 0;
  }
`;

const Title = styled(TitleH1).attrs({ className: "banner__title" })`
  padding-bottom: 0.5rem;

  ${breakpoints.small} {
    font-size: 1.8rem;
  }
`;

const ButtonWrapper = styled.div.attrs({ className: "banner__buttons" })`
  display: flex;
  flex-direction: row;

  ${breakpoints.small} {
    margin: 10px 0;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  padding: 0.4rem 1rem;
  transition: 0.4s;
  background-color: #fff;
  color: #333;
  border-radius: 0.5rem;

  &:hover {
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
  }
`;

const PlayButton = styled(Button).attrs({ className: "banner__button play" })`
  margin-right: 1rem;
`;

const Description = styled.p.attrs({ className: "banner__description" })`
  line-height: 1.3;
  padding-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
  max-width: 400px;
  height: 80px;

  ${breakpoints.small} {
    width: 100%;
  }
`;

const FadeBottom = styled.div.attrs({ className: "banner--fadeBottom" })`
  width: 100%;
  height: 25%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), transparent);

  ${breakpoints.small} {
    height: 30%;
  }
`;

const YoutubeContainer = styled.section<{ $play: boolean }>`
  position: absolute;
  inset: 0;
  display: ${({ $play }) => ($play ? "block" : "none")};
`;

const Youtube = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
  }
`;

const CloseYoutube = styled(Button).attrs({ as: "div" })`
  position: absolute;
  padding: 0;
  top: 0;
  left: 0;
  font-size: 2rem;
  opacity: 0;
  width: 100%;
  height: 100%;
  transition: 0s;

  &:hover {
    z-index: 1;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;
