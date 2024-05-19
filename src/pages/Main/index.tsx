import React from "react";
import styled from "styled-components";
import $K from "../../constants";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Row from "../../components/Row";
import { fetchActionMovies, fetchComedyMovies, fetchTopRated, fetchTrending } from "../../api/request";

const MainPage: React.FC = () => {
  return (
    <Container>
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchClosure={fetchTrending} />
      <Row title="Top Rated" id="TR" fetchClosure={fetchTopRated} />
      <Row title="Action Movies" id="AM" fetchClosure={fetchActionMovies} />
      <Row title="Comedy Movies" id="CM" fetchClosure={fetchComedyMovies} />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;

  overflow-x: hidden;
  padding: 0 calc(3.5vw + 5px);
  background: url("/images/home-background.png") no-repeat fixed center center;
  background-size: cover;
`;
