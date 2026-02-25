import styled from "styled-components";

export const InputWrapper = styled.div`
  flex: 1;
`;

export const InputLabel = styled.div`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const StyledFormInput = styled.input`
  width: 100%;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  height: 35px;
`;
