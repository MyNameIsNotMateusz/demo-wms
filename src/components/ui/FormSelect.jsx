import ReactSelect from "react-select";
import { SelectWrapper, SelectLabel } from "./FormSelect.styles";
import { useTheme } from "styled-components";

export const FormSelect = ({
  id,
  label,
  placeholder,
  value,
  handleChange,
  options,
}) => {
  const theme = useTheme();
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <SelectWrapper>
      <SelectLabel htmlFor={id}>{label}</SelectLabel>
      <ReactSelect
        inputId={id}
        value={selectedOption}
        onChange={(option) => handleChange(option?.value || "")}
        options={options}
        placeholder={placeholder}
        styles={{
          control: (base) => ({
            ...base,
            ...theme.fontSizes.responsive,
            borderRadius: "4px",
            borderColor: "#ccc",
            "&:hover": { borderColor: "#ccc" },
            boxShadow: "none",
          }),
          option: (base, state) => ({
            ...base,
            ...theme.fontSizes.responsive,
            backgroundColor: state.isFocused && "#0159c3",
            color: state.isFocused ? "#fff" : "#333333",
          }),
          singleValue: (base) => ({
            ...base,
            ...theme.fontSizes.responsive,
          }),
        }}
      />
    </SelectWrapper>
  );
};
