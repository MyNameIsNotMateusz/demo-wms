import { StyledCellInput } from "./CellInput.styles";

export const CellInput = ({
  type,
  value,
  handleFocus,
  handleChange,
  handleBlur,
}) => {
  return (
    <StyledCellInput
      type={type}
      min={type === "number" ? 0 : undefined}
      value={value}
      onFocus={(e) => {
        handleFocus && handleFocus(e.target.value);
      }}
      onChange={(e) => {
        handleChange && handleChange(e.target.value);
      }}
      onBlur={(e) => {
        handleBlur && handleBlur(e.target.value);
      }}
    />
  );
};
