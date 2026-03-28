import { CheckboxWrapper, CheckboxLabel, CheckboxHeader } from "./CheckboxField.styles"

export const CheckboxField = ({ id, label, hasMargin, checked, handleChange, disabled, header }) => {
    return (
        <CheckboxWrapper $hasMargin={hasMargin}>
            <input
                type="checkbox"
                checked={checked}
                style={{ cursor: "pointer" }}
                onChange={(e) => {
                    handleChange(e.target.checked);
                }}
                disabled={disabled}
            />
            {header ? (
                <CheckboxHeader htmlFor={id}>
                    {label}
                </CheckboxHeader>
            ) : (
                <CheckboxLabel htmlFor={id}>
                    {label}
                </CheckboxLabel>
            )}
        </CheckboxWrapper>
    )
}