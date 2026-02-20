import styled from "styled-components";

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectLabel = styled.div`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;
