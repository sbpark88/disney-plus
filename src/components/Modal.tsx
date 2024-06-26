import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChildrenComponent } from "./interfaces/common";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { createPortal } from "react-dom";

export interface CloseModalProps extends ChildrenComponent {
  closeModal: () => void;
}

const Modal: React.FC<CloseModalProps> = ({ closeModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <Wrap>
      <Inner ref={modalRef}>
        <CloseBtn onClick={closeModal}>
          <div></div>
          <div></div>
        </CloseBtn>
        {children}
      </Inner>
    </Wrap>,
    document.body,
  );
};

export default Modal;

const Wrap = styled.div.attrs({ className: "wrapper-modal", role: "presentation" })`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
`;

const Inner = styled.div.attrs({ className: "modal" })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  min-width: 400px;
  width: 60%;
  height: 70%;
  background-color: #555;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  z-index: 9;
  animation: fadeIn 0.4s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const CloseBtn = styled.div.attrs({ className: "modal-close" })`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 15px;
  right: 15px;
  z-index: 9;
  transition: all 0.4s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  div {
    position: absolute;
    border-top: 3px solid #bbb;
    width: 40px;

    &:hover {
      transform: scale(1);
    }

    &:nth-child(1) {
      right: 2px;
      transform: rotate(-45deg);
      transform-origin: top right;
    }
    &:nth-child(2) {
      right: -12px;
      transform: rotate(45deg);
      transform-origin: top left;
    }
  }
`;
