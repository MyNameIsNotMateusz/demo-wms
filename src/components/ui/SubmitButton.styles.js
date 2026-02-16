import styled from "styled-components";

export const StyledSubmitButton = styled.input`
  margin-top: auto;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-transform: uppercase;
  transition: background-color 0.2 ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 1600px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 1200px) {
    padding: 8px 16px;
    font-size: 12px;
  }

  @media (max-width: 992px) {
    padding: 7px 13px;
    font-size: 11px;
  }

  @media (max-width: 768px) {
    padding: 5px 11px;
    font-size: 9px;
  }

  @media (max-width: 480px) {
    padding: 4px 9px;
    font-size: 8px;
  }
`;
