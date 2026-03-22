import {
  StyledFormCard,
  FormCardHeader,
  FormCardTitle,
  FormCardBody,
  FormCardFooter
} from "./FormCard.styles";

export const FormCard = ({ title, children, footer }) => {
  return (
    <StyledFormCard>
      <FormCardHeader>
        <FormCardTitle>{title}</FormCardTitle>
      </FormCardHeader>
      <FormCardBody>{children}</FormCardBody>
      {footer && (
        <FormCardFooter>
          {footer}
        </FormCardFooter>
      )}
    </StyledFormCard>
  );
};
