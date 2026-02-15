import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow: auto;
  flex: 1;
  margin: 0 10px 10px 10px;

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

export const Table = styled.table`
  border-spacing: 2px;
  background-color: #dddee0;
`;

export const TableHeader = styled.thead`
  top: 0px;
  position: sticky;

  &.active {
    box-shadow: 0px 6px 21px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const TableHeaderRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TableHeaderCell = styled.th`
  position: relative;

  &:first-child {
    min-width: 70px;
    max-width: 70px;
    width: 70px;

    @media (max-width: 1600px) {
      min-width: 60px;
      max-width: 60px;
      width: 60px;
    }

    @media (max-width: 1200px) {
      min-width: 53px;
      max-width: 53px;
      width: 53px;
    }

    @media (max-width: 992px) {
      min-width: 51px;
      max-width: 51px;
      width: 51px;
    }

    @media (max-width: 768px) {
      min-width: 49px;
      max-width: 49px;
      width: 49px;
    }

    @media (max-width: 576px) {
      min-width: 40px;
      max-width: 40px;
      width: 40px;
    }

    @media (max-width: 480px) {
      min-width: 30px;
      max-width: 30px;
      width: 30px;
    }
  }

  &:not(:first-child) {
    ${({ theme }) => theme.table.cellMaxWidth}
  }
`;

export const ColumnFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px 5px 5px;
  row-gap: 10px;

  @media (max-width: 1600px) {
    padding: 0 5px 5px 5px;
    row-gap: 9px;
  }

  @media (max-width: 1200px) {
    padding: 0 4.5px 4.5px 4.5px;
    row-gap: 8px;
  }

  @media (max-width: 992px) {
    padding: 0 4px 4px 4px;
    row-gap: 7px;
  }

  @media (max-width: 768px) {
    padding: 0 3.5px 3.5px 3.5px;
    row-gap: 6px;
  }
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

export const ColumnTitle = styled.span`
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
    width: 18px;
    height: 18px;
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
  padding: 8px 5px;
  width: 100%;

  ${({ theme }) => theme.fontSizes.responsive};

  @media (max-width: 1600px) {
    padding: 7px 4px;
  }

  @media (max-width: 1200px) {
    padding: 6px 3.5px;
  }

  @media (max-width: 992px) {
    padding: 5.5px 3.5px;
  }

  @media (max-width: 768px) {
    padding: 5px 3px;
  }
`;

export const ColumnResizer = styled.div`
  position: absolute;
  z-index: 2000;
  top: -2px;
  right: 0;
  bottom: 0px;
  width: 5px;
  cursor: col-resize;

  background-color: ${({ $active }) => ($active ? "#b0b4b8" : "none")};
`;

export const TableBody = styled.tbody`
  background-color: #fff;
`;

export const TableBodyRow = styled.tr`
  cursor: pointer;

  &:nth-child(even) {
    background-color: #f9fafc;
  }

  &:hover {
    background-color: #e7f1fd;
  }

  ${({ $isActive, theme }) => $isActive && theme.table.activeRowStyle};
`;

export const TableBodyCell = styled.td`
  white-space: nowrap;
  font-weight: 500;
  color: #434d59;
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;

  &:not(:first-child) {
    ${({ theme }) => theme.table.cellMaxWidth}
  }
  ${({ theme }) => theme.fontSizes.responsive};

  ${({ $isActive, theme }) => $isActive && theme.table.activeTdStyle};

  &:first-child {
    text-align: center;
  }

  @media (max-width: 1600px) {
    padding: 9px;
  }

  @media (max-width: 1200px) {
    padding: 8px;
  }

  @media (max-width: 992px) {
    padding: 7px;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;
