import { StyledSubmitButton } from "./SubmitButton.styles";

export const SubmitButton = ({ isLoading, onClick, label = "Submit" }) => {
  return (
    <StyledSubmitButton
      type="submit"
      value={isLoading ? "Loading..." : label}
      disabled={isLoading}
      onClick={onClick}
    />
  );
};