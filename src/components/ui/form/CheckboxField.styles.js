import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  flex: 1;
  display: flex;
  column-gap: 5px;
  align-items: center;
  margin-bottom: 5px;
  margin-left: ${({ $hasMargin }) => ($hasMargin ? "5px" : "0")};
`;

export const CheckboxLabel = styled.label`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const CheckboxHeader = styled.label`
  ${({ theme }) => theme.fontSizes.responsive};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  white-space: nowrap;
`;
