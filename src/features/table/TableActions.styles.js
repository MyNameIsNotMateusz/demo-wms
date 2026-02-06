import styled from "styled-components";

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: auto;
  padding: 0 10px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const Button = styled.button`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  @media (max-width: 1600px) {
    font-size: 15px;
    min-height: 2.75rem;
    padding: calc(0.75rem - 1px) calc(1.25rem - 1px);
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    min-height: 2.5rem;
    padding: calc(0.65rem - 1px) calc(1rem - 1px);
  }

  @media (max-width: 992px) {
    font-size: 13px;
    min-height: 2.25rem;
    padding: calc(0.6rem - 1px) calc(0.75rem - 1px);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    min-height: 2rem;
    padding: calc(0.5rem - 1px) calc(0.6rem - 1px);
  }

  @media (max-width: 576px) {
    font-size: 11px;
    min-height: 1.75rem;
    padding: calc(0.45rem - 1px) calc(0.5rem - 1px);
  }

  @media (max-width: 480px) {
    font-size: 10px;
    min-height: 1.65rem;
    padding: calc(0.4rem - 1px) calc(0.45rem - 1px);
  }

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #f0f0f1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;
