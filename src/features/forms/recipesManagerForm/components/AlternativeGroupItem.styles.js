import styled from "styled-components";

export const GroupItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1600px) {
    padding: 14px;
    row-gap: 14px;
  }

  @media (max-width: 1200px) {
    padding: 12px;
    row-gap: 12px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    row-gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 7px;
    row-gap: 7px;
  }
`;

export const GroupItemHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const GroupItemTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const GroupItemActions = styled.div`
  display: flex;
  column-gap: 5px;
  margin-left: auto;
`;

export const GroupItemContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const GroupItemRow = styled.div`
  display: flex;
  column-gap: 8px;
`;
