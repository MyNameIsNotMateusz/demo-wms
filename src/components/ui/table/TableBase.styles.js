import styled from "styled-components";

export const TableBodyRow = styled.tr`
  cursor: pointer;

  &:nth-child(even) {
    background-color: #f9fafc;
  }

  &:hover {
    ${({ theme }) => theme.table.activeRowStyle};
  }
`;

export const TableBodyCell = styled.td`
  white-space: nowrap;
  font-weight: 500;
  color: #434d59;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme }) => theme.fontSizes.responsive};

  &:first-child {
    text-align: center;
    min-width: 35px;
    max-width: 35px;
    width: 35px;
  }

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
