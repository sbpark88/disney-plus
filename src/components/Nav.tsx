import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import $K from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { googleSignIn } from "../utils/auth/google";
import UserInfo from "./UserInfo";

const Nav = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchMovie = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.trim();
      searchText ? navigate(`/search?keyword=${searchText}`) : navigate("/main");
    },
    [navigate],
  );

  useEffect(() => {
    const hideNav = () => (window.scrollY > 50 ? setShow(true) : setShow(false));
    window.addEventListener("scroll", hideNav);
    return () => window.removeEventListener("scroll", hideNav);
  }, []);

  useEffect(() => {}, []);

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney Plus Logo" onClick={() => (window.location.href = "/")} />
      </Logo>
      {location.pathname === "/login" ? (
        <Login onClick={googleSignIn}>login</Login>
      ) : (
        <Search placeholder="검색어를 입력해주세요" onChange={searchMovie}></Search>
      )}
      <UserInfo />
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${$K.Style.NavHeight};
  background-color: ${({ $show }) => ($show ? "rgba(9,11,19,0.9)" : "#090b13")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 9;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: ${$K.Style.NavHeight};
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  color: #fff;
  font-size: 1.4rem;
  letter-spacing: 2px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Search = styled.input.attrs({ className: "nav__input-search" })`
  margin: 0 auto;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.58);
  border: 1px solid #938f8f;
  border-radius: 5px;
  padding: 3px 5px;
  outline: none;
  color: #fff;
`;
