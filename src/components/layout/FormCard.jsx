import {
  StyledFormCard,
  FormCardHeader,
  FormCardTitle,
  FormCardBody,
  FormCardFooter,
  FormCardTabs
} from "./FormCard.styles";

export const FormCard = ({
  title,
  children,
  footer,
  tabs,
}) => {
  return (
    <StyledFormCard>
      <FormCardHeader>
        <FormCardTitle>{title}</FormCardTitle>
      </FormCardHeader>

      <FormCardBody>
        {children}
      </FormCardBody>

      {footer && (
        <FormCardFooter>
          {footer}
        </FormCardFooter>
      )}

      {tabs && (
        <FormCardTabs>
          {tabs}
        </FormCardTabs>
      )}
    </StyledFormCard>
  );
};