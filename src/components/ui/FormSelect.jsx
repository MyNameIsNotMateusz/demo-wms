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
  handleChange,
  options,
}) => {
  return (
    <SelectWrapper>
      <SelectLabel htmlFor={id}>{label}</SelectLabel>
      <StyledFormSelect
        name={id}
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledFormSelect>
    </SelectWrapper>
  );
};
