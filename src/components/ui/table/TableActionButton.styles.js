import styled from "styled-components";

export const StyledActionButton = styled.button`
  position: relative;
  width: ${({ $isSmall }) => ($isSmall ? "100px" : "130px")};
  height: ${({ $isSmall }) => ($isSmall ? "32px" : "35px")};
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid hsl(213, 99%, 34%);
  background-color: hsl(213, 99%, 38%);
  transition: all 0.3s;
  padding: 0;
  overflow: hidden;

  &:hover {
    background: hsl(213, 99%, 38%);
  }

  &:active {
    border: 1px solid hsl(213, 99%, 29%);
  }
`;

export const ActionButtonText = styled.span`
  transform: ${({ $isSmall }) =>
    $isSmall ? "translateX(13px)" : "translateX(21px)"};
  color: #fff;
  font-weight: 500;
  font-size: ${({ theme, $isSmall }) =>
    $isSmall ? theme.fontSizes.xs : theme.fontSizes.sm};
  transition: all 0.3s;

  ${StyledActionButton}:hover & {
    color: transparent;
  }
`;

export const ActionButtonIcon = styled.span`
  position: absolute;
  transform: ${({ $isSmall }) =>
    $isSmall ? "translateX(70px)" : "translateX(95px)"};
  height: 100%;
  width: ${({ $isSmall }) => ($isSmall ? "26px" : "32px")};
  background-color: hsl(213, 99%, 34%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  svg {
    width: ${({ $isSmall }) => ($isSmall ? "17px" : "23px")};
    stroke: #fff;
  }

  ${StyledActionButton}:hover & {
    width: ${({ $isSmall }) => ($isSmall ? "100px" : "128px")};
    transform: translateX(0);
  }

  ${StyledActionButton}:active & {
    background-color: hsl(213, 99%, 29%);
  }
`;
