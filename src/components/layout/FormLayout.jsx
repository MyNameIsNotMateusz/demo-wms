import {
  FormWrapper,
  FormHeader,
  FormHeaderText,
  CloseButton,
  Line,
  FormBody,
} from "./FormLayout.styles";

export const FormLayout = ({ title, onClose, isLoading, children }) => {
  return (
    <FormWrapper>
      <FormHeader>
        <FormHeaderText>{title}</FormHeaderText>
        <CloseButton onClick={() => !isLoading && onClose?.()}>
          <Line className="one" />
          <Line className="two" />
        </CloseButton>
      </FormHeader>
      <FormBody>{children}</FormBody>
    </FormWrapper>
  );
};
