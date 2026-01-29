import { navItems } from "../../data/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../api/authApi";
import { useSelector } from "react-redux";
import {
  NavContainer,
  NavTabs,
  NavItem,
  NavTabItem,
  UserPanel,
  UserName,
  NavTabItemLogout,
  NavDetails,
  NavSection,
  NavItemsWrapper,
  NavDetailItem,
  IconWrapper,
  TextWrapper,
  NavSectionTitle,
} from "./Navbar.styles";
import { useAuth } from "../../auth/AuthProvider";
import { clearAuthData } from "../../features/auth/authSlice";
import React from "react";

export const Navbar = ({ handleOpenForm, activeFormName, resetState }) => {
  const { setAccessToken } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const userRole = useSelector(
    (state) => state.auth.user.role?.toLowerCase() || "",
  );

  const userName = useSelector((state) => state.auth.user.name || "");
  const tabsAccess = useSelector((state) => state.auth.tabsAccess);

  const filteredNavBarData = {
    tabs: navItems.tabs
      .map((tab) => {
        const accessTab = tabsAccess.find((t) => t.code === tab.code);
        if (!accessTab) return null;

        const filteredSections = tab.sections
          .map((section) => {
            const filteredItems = section.items.filter(
              (item) => accessTab.subtabs[item.code],
            );
            if (filteredItems.length === 0) return null;
            return { ...section, items: filteredItems };
          })
          .filter(Boolean);

        return { ...tab, sections: filteredSections };
      })
      .filter(Boolean),
  };

  useEffect(() => {
    const { pathname } = location;

    const foundIndex = filteredNavBarData.tabs.findIndex((tab) => {
      if (pathname.startsWith("/settings")) return tab.code === "settings";
      if (
        pathname.startsWith("/logisticsStock") ||
        pathname.startsWith("/productionStock") ||
        pathname.startsWith("/coilStock") ||
        pathname.startsWith("/outgoings")
      ) {
        return tab.code === "warehouse";
      }
      return false;
    });

    setActiveTabIndex(foundIndex !== -1 ? foundIndex : 0);
  }, [location.pathname]);

  useEffect(() => {
    resetState();
  }, [activeTabIndex]);

  const hasContent =
    filteredNavBarData.tabs[activeTabIndex].sections.length > 0;

  return (
    <NavContainer>
      <NavTabs>
        {filteredNavBarData.tabs.map((tab, index) => (
          <NavItem to={tab.to} onClick={resetState} key={index}>
            <NavTabItem className={activeTabIndex === index ? "active" : ""}>
              {tab.label}
            </NavTabItem>
          </NavItem>
        ))}
        <UserPanel>
          <UserName>Welcome, {userName}</UserName>
          <NavItem
            onClick={() =>
              logout(setAccessToken, clearAuthData, dispatch, navigate)
            }
          >
            <NavTabItemLogout>Log out</NavTabItemLogout>
          </NavItem>
        </UserPanel>
      </NavTabs>
      <NavDetails $hasContent={hasContent}>
        {filteredNavBarData.tabs[activeTabIndex].sections.map(
          (section, index) => (
            <NavSection key={index}>
              <NavItemsWrapper>
                {section.items
                  .filter((item) => {
                    if (
                      userRole !== "admin" &&
                      ["User Management", "Manual Inventory Change"].includes(
                        item.text,
                      )
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((item, index) => (
                    <NavDetailItem
                      key={index}
                      onClick={() => handleOpenForm(item.text)}
                      $isActive={item.text === activeFormName}
                    >
                      <IconWrapper>
                        <img src={item.icon} alt={item.text} />
                      </IconWrapper>
                      <TextWrapper>
                        {item.text.split(" ").map((word, index, arr) => (
                          <React.Fragment key={index}>
                            {word} {index < arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </TextWrapper>
                    </NavDetailItem>
                  ))}
              </NavItemsWrapper>
              <NavSectionTitle>
                <span>{section.title}</span>
              </NavSectionTitle>
            </NavSection>
          ),
        )}
      </NavDetails>
    </NavContainer>
  );
};
