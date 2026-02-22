import styled from "styled-components";

export const StyledFormTable = styled.table`
  border-spacing: 2px;
  background-color: #dddee0;
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0px;
  z-index: 2000;
`;

export const TableHeaderRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TableHeaderCell = styled.th`
  position: relative;

  &:first-child {
    min-width: 35px;
    max-width: 35px;
    width: 35px;
  }
`;

export const ColumnFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  row-gap: 3px;
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

export const ColumnTitle = styled.div`
  font-weight: 600;
  color: #656c75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  user-select: none;
  ${({ theme }) => theme.fontSizes.responsive};
`;

export const SortIconWrapper = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    width: 16px;
    height: 16px;
    fill: #ccc;
  }

  svg:first-child {
    fill: ${({ state }) => (state === "asc" ? "#1c304f" : "#ccc")};
  }

  svg:last-child {
    fill: ${({ state }) => (state === "desc" ? "#1c304f" : "#ccc")};
  }
`;

export const ColumnFilterInput = styled.input`
  border: 1.7px solid #dddee0;
  outline: none;
  background-color: #fff;
  color: #434d59;
  font-weight: 500;
  padding: 4px 5px;
  width: 100%;

  ${({ theme }) => theme.fontSizes.responsive};

  @media (max-width: 1600px) {
    padding: 3px 4px;
  }

  @media (max-width: 1200px) {
    padding: 2px 3px;
  }
  @media (max-width: 768px) {
    padding: 1.5px 2px;
  }
`;

export const TableBody = styled.tbody`
  background-color: #fff;
`;
