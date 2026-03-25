import { SummaryStyled } from "./Summary.styles";

export const Summary = ({ label, value }) => {
    return (
        <SummaryStyled>
            {label}:{" "}
            <strong>
                {value}
            </strong>
        </SummaryStyled>
    )
}