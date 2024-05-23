import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { googleSignOut } from "../utils/auth/google";
import useGoogleSignInCheck from "../hooks/useGoogleSignInCheck";
import useOnClickOutside from "../hooks/useOnClickOutside";

const UserInfo: React.FC = () => {
  const user = useGoogleSignInCheck();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dropdown, setDropdown] = useState(false);
  useOnClickOutside(wrapperRef, () => setDropdown(false));

  useEffect(() => {
    if (!user?.uid) {
      setDropdown(false);
    }
  }, [user?.uid]);

  return (
    <>
      {user && (
        <Wrapper ref={wrapperRef}>
          <UserProfile src={user.photoURL ?? ""} onClick={() => setDropdown(!dropdown)} />
          <InfoDropDown className={dropdown ? "" : "hide"}>
            <span onClick={googleSignOut}>Sign out</span>
          </InfoDropDown>
        </Wrapper>
      )}
    </>
  );
};

export default UserInfo;

const Wrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const UserProfile = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #edb;
  box-sizing: border-box;
  outline: none;
`;

const InfoDropDown = styled.div`
  position: absolute;
  top: 58px;
  right: 0;
  overflow: hidden;
  cursor: auto;

  span {
    display: inline-block;
    width: max-content;
    letter-spacing: 2px;
    padding: 10px;
    color: #040714;
    background-color: #9f9f9f;
    border-radius: 2px;
    transition: all 0.4s;
    transform: translate(0, 0);
  }

  &.hide {
    span {
      visibility: hidden;
      opacity: 0;
      transform: translate(0, -58px);
    }
  }
`;
