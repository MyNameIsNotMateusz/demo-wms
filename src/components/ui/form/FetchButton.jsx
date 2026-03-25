import { FetchButtonStyled, ButtonText } from "./FetchButton.styles"

export const FetchButton = ({ active, disabled, onClick, isLoading, text = "Search",
    loadingText = "Loading...", }) => {
    return (
        <FetchButtonStyled $active={active} disabled={disabled} onClick={onClick}>
            <ButtonText $active={active}>
                {isLoading ? loadingText : text}
            </ButtonText>
        </FetchButtonStyled>
    )
}