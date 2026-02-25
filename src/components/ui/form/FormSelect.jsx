import ReactSelect from "react-select";
import { SelectWrapper, SelectLabel } from "./FormSelect.styles";

export const FormSelect = ({
  id,
  label,
  placeholder,
  value,
  handleChange,
  options,
  isDisabled,
}) => {
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
        isDisabled={isDisabled}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "35px",
            height: "35px",
            borderRadius: "4px",
            borderColor: "#ccc",
            boxShadow: "none",
            "&:hover": { borderColor: "#ccc" },
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
            height: "35px",
            fontSize: "14px",
          }),
          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: "35px",
          }),
          option: (base, state) => ({
            ...base,
            fontSize: "14px",
            backgroundColor: state.isFocused && "#0159c3",
            color: state.isFocused ? "#fff" : "#333333",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </SelectWrapper>
  );
};
