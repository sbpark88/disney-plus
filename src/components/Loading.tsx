import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  width?: string;
}

const Loading: FunctionComponent<Props> = ({ width }) => {
  return (
    <Wrap>
      <Icon width={width}></Icon>
    </Wrap>
  );
};

export default Loading;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotation 1s infinite cubic-bezier(0.21, 0.54, 0.47, 0.8);

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Icon = styled.div<{ width?: string }>`
  width: ${({ width = "30px" }) => width};
  height: ${({ width = "30px" }) => width};
  border: 4px solid #bbb;
  border-top-color: transparent;
  border-radius: 50%;
`;
