import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #1f1f1f;
  padding: 30px;
  width: 450px;
  border-radius: 20px;

  input::placeholder {
    color: #aaa;
  }

  @media (max-width: 1600px) {
    width: 425px;
    gap: 9.5px;
  }

  @media (max-width: 1200px) {
    gap: 9.5px;
    width: 415px;
  }

  @media (max-width: 992px) {
    gap: 9px;
    padding: 29px;
    width: 410px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding: 20px;
    width: 320px;
    margin: 0 5px;
  }
`;

export const Label = styled.label`
  color: #f1f1f1;
  font-weight: 600;

  @media (max-width: 1600px) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const InputWrapper = styled.div`
  border: 1.5px solid #333;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
  background-color: #2b2b2b;

  &:focus-within {
    border-width: 1.5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 1200px) {
    height: 48px;
  }

  @media (max-width: 480px) {
    height: 40px;
    padding-left: 7px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const Input = styled.input`
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 100%;
  background-color: #2b2b2b;
  color: #f1f1f1;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 9999s ease-in-out 0s;

    -webkit-box-shadow: 0 0 0 1000px #2b2b2b inset !important;
    box-shadow: 0 0 0 1000px #2b2b2b inset !important;
    -webkit-text-fill-color: #f1f1f1 !important;
    caret-color: #f1f1f1 !important;
    border-radius: 10px;
    border: none !important;
  }

  @media (max-width: 1600px) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const SignInButton = styled.button`
  margin: 20px 0 10px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;

  @media (max-width: 1600px) {
    height: 48px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: 480px) {
    margin: 14px 0 7px 0;
    height: 41px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const InfoText = styled.p`
  text-align: center;
  color: #f1f1f1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 5px;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const HighlightText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;
