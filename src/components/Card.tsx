import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface CardItem {
  imgSrc: string;
  imgAlt: string;
  videoSrc: string;
  videoType: string;
}

const Card: FunctionComponent<CardItem> = ({ imgSrc, imgAlt, videoSrc, videoType }) => {
  return (
    <Wrap>
      <Img src={imgSrc} alt={imgAlt} />
      <Video autoPlay loop muted>
        <source src={videoSrc} type={videoType} />
      </Video>
    </Wrap>
  );
};

export default Card;

const Wrap = styled.div`
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  transition: 0.4s;
  box-shadow: 10px 7px 10px rgba(75, 75, 75, 0.3);

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.7);
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: 0.4s;

  &:hover {
    opacity: 1;
  }
`;
