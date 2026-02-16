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
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  @media (max-width: 1600px) {
    padding: 6px;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }

  ${({ theme }) => theme.fontSizes.responsive};
`;
