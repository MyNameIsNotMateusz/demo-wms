import {
  SelectWrapper,
  SelectLabel,
  StyledFormSelect,
} from "./FormSelect.styles";

export const FormSelect = ({
  id,
  label,
  placeholder,
  value,
  setter,
  options,
}) => {
  return (
    <SelectWrapper>
      <SelectLabel htmlFor={id}>{label}</SelectLabel>
      <StyledFormSelect
        name={id}
        value={value}
        onChange={(e) => {
          setter(e.target.value);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledFormSelect>
    </SelectWrapper>
  );
};
