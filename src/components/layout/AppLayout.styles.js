import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
`;

export const NavigationWrapper = styled.div`
  width: 100%;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

export const DarkOverlay = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  transition:
    opacity 0.25s ease-in-out,
    visibility 0.25s;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};

  height: 100%;
`;
