import React from "react";
import "./App.scss";
import Nav from "./components/Nav";
import styled from "styled-components";
import Banner from "./components/Banner";
import $K from "./constants";

function App() {
  return (
    <div className="App">
      <Container>
        <Nav />
        <Banner />
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
