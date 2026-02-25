import { StyledFormInput, InputLabel, InputWrapper } from "./FormInput.styles";

export const FormInput = ({ id, label, type, value, disabled, handleChange }) => {
  return (
    <InputWrapper>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <StyledFormInput
        type={type}
        name={id}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </InputWrapper>
  );
};
