import { navItems } from "../../data/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../api/authApi";
import {
  NavContainer,
  NavTabs,
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
import { useNavigate } from "react-router-dom";

export const Navbar = ({ handleOpenForm, activeForm, resetState }) => {
  const { setAccessToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            if (!filteredItems.length) return null;
            return { ...section, items: filteredItems };
          })
          .filter(Boolean);

        return { ...tab, sections: filteredSections };
      })
      .filter(Boolean),
  };

  useEffect(() => {
    resetState();
  }, [activeTabIndex]);

  const hasContent =
    filteredNavBarData.tabs[activeTabIndex]?.sections?.length > 0;

  return (
    <NavContainer>
      <NavTabs>
        {filteredNavBarData.tabs.map((tab, index) => (
          <NavTabItem
            key={index}
            className={activeTabIndex === index ? "active" : ""}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.label}
          </NavTabItem>
        ))}

        <UserPanel>
          <UserName>Welcome, {userName}</UserName>
          <NavTabItemLogout
            onClick={() => {
              logout(setAccessToken, clearAuthData, dispatch);
              navigate("/login");
            }}
          >
            Log out
          </NavTabItemLogout>
        </UserPanel>
      </NavTabs>

      <NavDetails $hasContent={hasContent}>
        {filteredNavBarData.tabs[activeTabIndex]?.sections?.map(
          (section, sectionIndex) => (
            <NavSection key={sectionIndex}>
              <NavItemsWrapper>
                {section.items
                  .filter((item) => {
                    if (
                      userRole !== "admin" &&
                      ["User Management", "Manual Inventory Change"].includes(
                        item.text,
                      )
                    )
                      return false;
                    return true;
                  })
                  .map((item, itemIndex) => (
                    <NavDetailItem
                      key={itemIndex}
                      onClick={() => handleOpenForm(item.code)}
                      $isActive={item.code === activeForm}
                    >
                      <IconWrapper>
                        <img src={item.icon} alt={item.text} />
                      </IconWrapper>
                      <TextWrapper>
                        {item.text.split(" ").map((word, idx, arr) => (
                          <React.Fragment key={idx}>
                            {word} {idx < arr.length - 1 && <br />}
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
