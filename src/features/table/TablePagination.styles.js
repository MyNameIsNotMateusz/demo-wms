import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const PaginationControls = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

export const PaginationInfo = styled.div`
  display: flex;
  column-gap: 3px;
  padding: 5px 10px;
  border-right: 1px solid #ccc;

  @media (max-width: 1200px) {
    padding: 4px 8px;
  }
`;

export const PaginationRange = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 550;
  color: #1c304f;
  min-width: 5rem;
  text-align: center;
  ${({ theme }) => theme.fontSizes.responsive};
`;

export const PaginationTotal = styled.span`
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #656c75;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const PaginationPageSize = styled.div`
  display: flex;
  padding: 0 10px;
  border-right: 1px solid #ccc;
`;

export const PageSizeSelect = styled.select`
  border: none;
  background-color: transparent;
  outline: none;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const PaginationButtons = styled.div`
  display: flex;
`;

export const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    height: 100%;
    fill: ${({ $active }) => ($active ? "#1c304f" : "#ccc")};
  }

  @media (max-width: 1200px) {
    padding: 5px;
  }

  @supports (-webkit-touch-callout: none) {
    width: 30px;
  }
`;
