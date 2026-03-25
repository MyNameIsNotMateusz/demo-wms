import styled from "styled-components";

export const SummaryStyled = styled.div`
  font-weight: 400;
  color: #434d59;
  white-space: nowrap;
  overflow: auto;
  text-transform: uppercase;
  margin-bottom: 10px;

  @media (max-width: 1600px) {
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    margin-bottom: 6px;
  }

  ${({ theme }) => theme.fontSizes.responsive};

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
`;
