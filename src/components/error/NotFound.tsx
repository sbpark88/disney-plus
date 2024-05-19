import React from "react";
import styled from "styled-components";

const NotFound: React.FC = () => {
  return (
    <Wrap>
      <Message>요청한 페이지를 찾지 못했습니다</Message>
    </Wrap>
  );
};

export default NotFound;

const Wrap = styled.div`
  margin-top: 40vh;
  text-align: center;
`;

const Message = styled.div`
  font-size: max(20px, 3.6vw);
`;
