import { StyledFieldWrapper, FieldLabel, FieldValue } from "./ReadOnlyField.styles"

export const ReadOnlyField = ({ label, value }) => {
    return (
        <StyledFieldWrapper>
            <FieldLabel>
                {label}
            </FieldLabel>
            <FieldValue>
                {value || label}
            </FieldValue>
        </StyledFieldWrapper>
    )
}