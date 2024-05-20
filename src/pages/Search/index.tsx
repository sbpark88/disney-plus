import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pipe } from "../../utils/fp";
import { fetchSearch } from "../../api/request";
import { Movie, MovieList } from "../../api/MovieDTO";
import styled from "styled-components";
import $K from "../../constants";
import useDebounce from "../../hooks/useDebounce";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const debouncedSearchParams = useDebounce(searchParams.get("keyword"));
  const [searchResults, setSearchResults] = useState<Movie[]>();

  const getMovies = (movieList: MovieList) => {
    return movieList.results.length > 0 ? movieList.results : undefined;
  };

  const getSearch = useCallback(() => {
    return pipe(fetchSearch, getMovies, setSearchResults);
  }, []);

  useEffect(() => {
    if (!debouncedSearchParams) setSearchResults([]);

    const query = { query: debouncedSearchParams };
    try {
      getSearch()(query);
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearchParams, getSearch]);

  return (
    <>
      {debouncedSearchParams !== null ? (
        <DisplayResults movies={searchResults} />
      ) : (
        <NoResults searchText={searchParams.get("keyword")} />
      )}
    </>
  );
};

export default SearchPage;

interface DisplayResultsProps {
  movies?: Movie[];
}

const DisplayResults: React.FC<DisplayResultsProps> = ({ movies }) => {
  const navigate = useNavigate();

  const validator = useCallback((movie: Movie) => {
    const posterIsAvailable = movie.backdrop_path !== null;
    const typeIsNotPerson = movie.media_type !== "person";
    return posterIsAvailable && typeIsNotPerson;
  }, []);

  const goToDetails = useCallback(
    (movieId: number) => {
      navigate(`/movie/${movieId}`);
    },
    [navigate],
  );

  return (
    <Container>
      {movies?.filter(validator).map((movie) => (
        <MovieItem key={movie.id}>
          <div className="movie__column-poster" onClick={() => goToDetails(movie.id)}>
            <img src={$K.Url.PosterSmall + movie.backdrop_path} alt="movie" className="movie__poster" />
            <p>{movie.title ?? movie.original_title}</p>
          </div>
        </MovieItem>
      ))}
    </Container>
  );
};

const Container = styled.section.attrs({ className: "search-container" })`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px 50px;
  justify-content: space-around;
  margin: 14px 30px;
`;

const MovieItem = styled.div.attrs({ className: "movie" })`
  border: 1px solid #555;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
    border-width: 3px;

    img {
      filter: blur(0);
    }
  }

  img {
    width: 100%;
    filter: blur(1px);
  }

  p {
    margin: 10px 0;
    text-align: center;
    font-size: 1.1rem;
    color: #dedede;
    font-weight: 700;
  }
`;

interface NoResultsProps {
  searchText: string | null;
}

const NoResults: React.FC<NoResultsProps> = ({ searchText }) => {
  return (
    <NoResultsMessage>
      <div className="no-results__text">{searchText && <p>{searchText}에 대한 검색 결과가 없습니다.</p>}</div>
    </NoResultsMessage>
  );
};

const NoResultsMessage = styled.section.attrs({ className: "no-results" })`
  padding: 40vh 10vw 0;
  text-align: center;
  font-size: max(2rem, 3vw);
`;
