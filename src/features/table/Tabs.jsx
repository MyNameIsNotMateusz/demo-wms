import { tabsItems } from "../../data/tabs";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TabsContainer,
  NavItem,
  TabInput,
  TabLabel,
  Indicator,
} from "./Tabs.styles";

export const Tabs = () => {
  const location = useLocation();
  const tabsAccess = useSelector((state) => state.auth.tabsAccess);

  const filteredTabs = tabsItems.filter((tab) =>
    tabsAccess?.some((accessTab) => accessTab.subtabs?.[tab.code] === true),
  );

  const getActiveTabIndex = () =>
    filteredTabs.findIndex((tab) => tab.path === location.pathname);

  const [activeTab, setActiveTab] = useState(() => {
    const index = getActiveTabIndex();
    return index !== -1 ? index : 0;
  });

  useEffect(() => {
    const index = getActiveTabIndex();
    if (index !== -1) setActiveTab(index);
  }, [location.pathname, filteredTabs]);

  return (
    <TabsContainer>
      {filteredTabs.map((tab, index) => (
        <div key={tab.path}>
          <NavItem to={tab.path}>
            <TabInput
              type="radio"
              name="tabs"
              id={tab.path}
              checked={activeTab === index}
              onChange={() => setActiveTab(index)}
            />
          </NavItem>
          <TabLabel htmlFor={tab.path}>{tab.label}</TabLabel>
        </div>
      ))}
      <Indicator $activeTab={activeTab + 1} />
    </TabsContainer>
  );
};
