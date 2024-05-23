import React from "react";
import "./App.scss";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import { OuterComponent } from "./components/interfaces/common";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import DetailPage from "./pages/Detail";
import SearchPage from "./pages/Search";
import NotFound from "./components/error/NotFound";
import styled from "styled-components";
import $K from "./constants";

const Layout: React.FC<OuterComponent> = () => {
  return (
    <>
      <Nav />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  position: absolute;
  top: ${$K.Style.NavHeight};
  min-height: calc(100vh - ${$K.Style.NavHeight});
  width: 100vw;
`;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<NotFound />}>
          <Route errorElement={<NotFound />}>
            <Route index element={<Navigate to="main" replace={true} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:movieId" element={<DetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
