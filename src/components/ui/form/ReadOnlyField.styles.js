import styled from "styled-components";

export const StyledFieldWrapper = styled.div`
  flex: 1;
`;

export const FieldLabel = styled.label`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const FieldValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: #656c75;
`;
