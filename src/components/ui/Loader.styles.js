import styled, { keyframes } from "styled-components";

const flipAnimation = keyframes`
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(180deg) rotateX(180deg);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100px;
  height: 100px;

  &::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: ${({ theme }) => theme.colors.primary};
    animation: ${flipAnimation} 1s infinite;
  }
`;
