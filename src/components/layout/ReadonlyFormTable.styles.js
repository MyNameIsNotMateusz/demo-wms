import styled from "styled-components";

export const StyledFormTable = styled.table`
  border-spacing: 2px;
  background-color: #dddee0;
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0px;
  z-index: 2;
`;

export const TableHeaderRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TableHeaderCell = styled.th`
  position: relative;
  text-align: start;
  white-space: nowrap;
  font-weight: 600;
  color: #656c75;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme }) => theme.fontSizes.responsive};
  padding: 8px;

  @media (max-width: 1200px) {
    padding: 7px;
  }

  @media (max-width: 992px) {
    padding: 6px;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const TableBody = styled.tbody`
  background-color: #fff;
`;
