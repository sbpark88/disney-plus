import React from "react";
import "./App.scss";
import Nav from "./components/Nav";
import styled from "styled-components";
import Banner from "./components/Banner";
import $K from "./constants";
import Category from "./components/Category";
import Row from "./components/Row";
import { fetchActionMovies, fetchComedyMovies, fetchTopRated, fetchTrending } from "./api/request";

function App() {
  return (
    <div className="App">
      <Container>
        <Nav />
        <Banner />
        <Category />
        <Row title="Trending Now" id="TN" fetchClosure={fetchTrending} />
        <Row title="Top Rated" id="TR" fetchClosure={fetchTopRated} />
        <Row title="Action Movies" id="AM" fetchClosure={fetchActionMovies} />
        <Row title="Comedy Movies" id="CM" fetchClosure={fetchComedyMovies} />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - ${$K.Style.NavHeight});
  overflow-x: hidden;
  top: ${$K.Style.NavHeight};
  padding: 0 calc(3.5vw + 5px);
  background: url("/images/home-background.png") no-repeat fixed center center;
  background-size: cover;
`;
