import { StyledSubmitButton } from "./SubmitButton.styles";

export const SubmitButton = ({ isLoading }) => {
  return (
    <StyledSubmitButton
      type="submit"
      value={isLoading ? "Loading..." : "Submit"}
      disabled={isLoading}
    />
  );
};
