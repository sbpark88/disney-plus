import React, { useEffect, useState } from "react";
import styled from "styled-components";
import $K from "../constants";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hideNav = () => (window.scrollY > 50 ? setShow(true) : setShow(false));
    window.addEventListener("scroll", hideNav);
    return () => window.removeEventListener("scroll", hideNav);
  }, []);

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney Plus Logo" onClick={() => (window.location.href = "/")} />
      </Logo>
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
