import React, { useState } from "react";
import { Movie } from "../api/MovieDTO";
import styled from "styled-components";
import { breakpoints } from "../styles/media";
import Modal, { CloseModalProps } from "./Modal";
import $K from "../constants";
import { TitleH2 } from "./Atomic";

interface Props {
  className: string;
  movie: Movie;
}

const Poster: React.FC<Props> = ({ className, movie }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Image
        className={className ?? "poster"}
        src={`${$K.Url.PosterSmall}${movie.backdrop_path}`}
        alt={movie.title}
        onClick={() => setOpenModal(true)}
      ></Image>
      {openModal && <MovieModal closeModal={() => setOpenModal(false)} movie={movie} />}
    </>
  );
};

export default Poster;

const Image = styled.img`
  width: 30vw;
  object-fit: contain;
  transition: all 0.4s;

  ${breakpoints.xLarge} {
    width: 400px;
  }
  ${breakpoints.small} {
    width: 70vw;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }

  &:hover {
    transform: scale(1.08);
  }
`;

interface ModalProps extends CloseModalProps {
  movie: Movie;
}

const MovieModal: React.FC<ModalProps> = ({
  closeModal,
  movie: { backdrop_path, title, overview, release_date, vote_average },
}) => {
  return (
    <Modal closeModal={closeModal}>
      <ModalImage src={`${$K.Url.PosterOriginal}${backdrop_path}`}></ModalImage>
      <ModalContent>
        <ModalUserForYou>{random80to100()}% for you</ModalUserForYou>
        {release_date}
        <ModalTitle>{title}</ModalTitle>
        <ModalOverview>⭐️ {vote_average}</ModalOverview>
        <ModalOverview>{overview}</ModalOverview>
      </ModalContent>
    </Modal>
  );
};

const ModalImage = styled.img.attrs({ className: "modal__poster-img" })`
  position: sticky;
  top: 0;
  width: 100%;
`;

const ModalContent = styled.div.attrs({ className: "modal__content hide-scroll" })`
  padding: 40px;
  bottom: 0;
  overflow-y: auto;
  flex-grow: 1;

  ${breakpoints.small} {
    padding: 20px;
  }
`;

const ModalUserForYou = styled.p.attrs({ className: "modal__user-for-you" })`
  font-weight: 600;
  font-size: 18px;
  color: #46d369;
  margin-bottom: 20px;
`;

const ModalTitle = styled(TitleH2).attrs({ className: "modal__title" })`
  font-size: 2.5rem;
  margin: 5px 0 20px;
`;

const ModalOverview = styled.p.attrs({ className: "modal__overview" })`
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 5px;
`;

const random80to100 = () => parseInt(`${Math.random() * 21 + 80}`);
