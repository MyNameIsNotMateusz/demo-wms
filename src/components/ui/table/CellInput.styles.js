import styled from "styled-components";

export const StyledCellInput = styled.input`
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  color: #434d59;
  font-weight: 500;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  height: 30px;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
