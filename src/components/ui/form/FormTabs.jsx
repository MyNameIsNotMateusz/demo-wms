import {
  FormTabsWrapper,
  NavItem,
  TabInput,
  TabLabel,
  Indicator,
} from "./FormTabs.styles";
import { Fragment } from "react/jsx-runtime";

export const FormTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <FormTabsWrapper>
      {tabs.map((tab, index) => (
        <Fragment key={tab.id}>
          <NavItem key={tab.id}>
            <TabInput
              type="radio"
              name="form-tabs"
              id={tab.id}
              checked={index === activeTab}
              onChange={() => onTabChange(index)}
            />
          </NavItem>
          <TabLabel htmlFor={tab.id}>{tab.label}</TabLabel>
        </Fragment>
      ))}
      <Indicator $activeTab={activeTab} />
    </FormTabsWrapper>
  );
};
