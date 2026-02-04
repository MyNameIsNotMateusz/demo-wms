import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const TabsContainer = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px;
  background-color: #f2f2f2;
  border-radius: 9px;
  margin-top: 5px;
`;

export const Indicator = styled.div`
  width: 180px;
  height: 28px;
  background: #ffffff;
  position: absolute;
  top: 2px;
  left: ${({ $activeTab }) => `calc(180px * ${$activeTab - 1} + 2px)`};
  z-index: 9;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow:
    0px 3px 8px rgba(0, 0, 0, 0.12),
    0px 3px 1px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  transition: all 0.2s ease-out;
`;

export const TabInput = styled.input`
  width: 180px;
  height: 28px;
  position: absolute;
  z-index: 99;
  outline: none;
  opacity: 0;
`;

export const TabLabel = styled.label`
  width: 180px;
  height: 28px;
  position: relative;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  opacity: 0.6;
  cursor: pointer;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const NavItem = styled(NavLink)`
  text-decoration: none;
`;
