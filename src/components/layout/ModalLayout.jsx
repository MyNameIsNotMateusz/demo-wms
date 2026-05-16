import { ModalWrapper, ModalHeader, ModalHeaderText, ModalBody, ModalFooter, ModalButtonRow, ModalButton } from "./ModalLayout.styles"

export const ModalLayout = ({ title, children, handleClose, handleSubmit }) => {

    return (
        <ModalWrapper>
            <ModalHeader>
                <ModalHeaderText>
                    {title}
                </ModalHeaderText>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <ModalButtonRow>
                    <ModalButton
                        type="button"
                        value="CLOSE"
                        onClick={handleClose}
                    />

                    <ModalButton
                        type="button"
                        value="SUBMIT"
                        onClick={handleSubmit}
                    />
                </ModalButtonRow>
            </ModalFooter>
        </ModalWrapper>
    )
}