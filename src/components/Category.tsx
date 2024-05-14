import React from "react";
import styled from "styled-components";
import { breakpoints } from "../styles/media";
import Card, { CardItem } from "./Card";

const Category = () => {
  return <Container>{cardItems.map(Card)}</Container>;
};

export default Category;

const Container = styled.section`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

  ${breakpoints.small} {
    grid-template-columns: 1fr;
  }
`;

const cardItems: CardItem[] = [
  {
    imgSrc: "/images/viewers-disney.png",
    imgAlt: "disney",
    videoSrc: "/videos/disney.mp4",
    videoType: "video/mp4",
  },
  {
    imgSrc: "/images/viewers-marvel.png",
    imgAlt: "marvel",
    videoSrc: "/videos/marvel.mp4",
    videoType: "video/mp4",
  },
  {
    imgSrc: "/images/viewers-pixar.png",
    imgAlt: "pixar",
    videoSrc: "/videos/pixar.mp4",
    videoType: "video/mp4",
  },
  {
    imgSrc: "/images/viewers-starwars.png",
    imgAlt: "starwars",
    videoSrc: "/videos/star-wars.mp4",
    videoType: "video/mp4",
  },
  {
    imgSrc: "/images/viewers-national.png",
    imgAlt: "national",
    videoSrc: "/videos/national-geographic.mp4",
    videoType: "video/mp4",
  },
];
