import styled from "styled-components";

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;

const FormButton = styled.button`
  align-items: center;
  align-self: flex-start;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  justify-content: center;
  padding: 8px 16px;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;

  @media (max-width: 1600px) {
    padding: 6px 12px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

  @media (max-width: 1200px) {
    padding: 5px 10px;
  }

  @media (max-width: 992px) {
    padding: 4px 8px;
    font-size: ${({ theme }) => theme.fontSizes.xxs};
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
  }

  @media (max-width: 480px) {
    padding: 2.5px 5px;
    font-size: ${({ theme }) => theme.fontSizes.xxxs};
  }

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #f0f0f1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;

export const UserFormGroup = ({ id, label, isLoading, onClick }) => {
  return (
    <FormGroup>
      <FormLabel htmlFor={id}>
        {label}
      </FormLabel>
      <FormButton
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading ? "Loading..." : "Reset Password"}
      </FormButton>
    </FormGroup>
  )
}