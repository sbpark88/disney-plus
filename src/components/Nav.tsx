import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hideNav = () => (window.scrollY > 50 ? setShow(true) : setShow(false));
    window.addEventListener("scroll", hideNav);
    return () => window.removeEventListener("scroll", hideNav);
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney Plus Logo" onClick={() => (window.location.href = "/")} />
      </Logo>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${({ show }) => (show ? "#090b13" : "transparent")};
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
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
