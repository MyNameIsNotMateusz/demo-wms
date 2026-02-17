import {
  StyledFormCard,
  FormCardHeader,
  FormCardTitle,
  FormCardBody,
} from "./FormCard.styles";

export const FormCard = ({ title, children }) => {
  return (
    <StyledFormCard>
      <FormCardHeader>
        <FormCardTitle>{title}</FormCardTitle>
      </FormCardHeader>
      <FormCardBody>{children}</FormCardBody>
    </StyledFormCard>
  );
};
