import styled from "styled-components";

export const StyledActionButton = styled.button`
  position: relative;
  width: 130px;
  height: 35px;
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
  transform: translateX(21px);
  color: #fff;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.3s;

  ${StyledActionButton}:hover & {
    color: transparent;
  }
`;

export const ActionButtonIcon = styled.span`
  position: absolute;
  transform: translateX(95px);
  height: 100%;
  width: 32px;
  background-color: hsl(213, 99%, 34%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  svg {
    width: 23px;
    stroke: #fff;
  }

  ${StyledActionButton}:hover & {
    width: 128px;
    transform: translateX(0);
  }

  ${StyledActionButton}:active & {
    background-color: hsl(213, 99%, 29%);
  }
`;
