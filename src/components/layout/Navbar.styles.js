import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 0 0;
  background-color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: 1600px) {
    padding: 7px 0 0 0;
  }

  @media (max-width: 992px) {
    padding: 6px 0 0 0;
  }

  @media (max-width: 768px) {
    padding: 5px 0 0 0;
  }

  @media (max-width: 576px) {
    padding: 4px 0 0 0;
  }

  @media (max-width: 480px) {
    padding: 2.7px 0 0 0;
  }
`;

export const NavTabs = styled.div`
  display: flex;
  column-gap: 2.5px;
  margin-left: 25px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  @media (max-width: 1600px) {
    margin-left: 22px;
  }

  @media (max-width: 1200px) {
    margin-left: 19px;
  }

  @media (max-width: 992px) {
    margin-left: 17px;
  }

  @media (max-width: 768px) {
    margin-left: 15px;
  }

  @media (max-width: 576px) {
    margin-left: 13px;
  }

  @media (max-width: 480px) {
    margin-left: 9px;
  }
`;

export const NavItem = styled(NavLink)`
  text-decoration: none;
`;

export const NavTabItem = styled.div`
  padding: 13px 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  cursor: pointer;
  color: #fff;

  ${({ theme }) => theme.fontSizes.responsive}

  &:hover {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 1600px) {
    padding: 12px 46px;
  }

  @media (max-width: 1200px) {
    padding: 11px 41px;
  }

  @media (max-width: 992px) {
    padding: 8px 28px;
  }

  @media (max-width: 576px) {
    padding: 6.5px 23px;
  }

  @media (max-width: 480px) {
    padding: 5px 16px;
  }
`;

export const UserPanel = styled.div`
  display: flex;
  column-gap: 15px;
  margin-left: auto;
`;

export const UserName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  white-space: nowrap;
  font-weight: 500;

  ${({ theme }) => theme.fontSizes.responsive}
`;

export const NavTabItemLogout = styled.div`
  padding: 13px 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  cursor: pointer;
  transition: transform 0.2s ease;

  ${({ theme }) => theme.fontSizes.responsive}

  &:hover {
    transform: translateX(-1.5px);
  }

  @media (max-width: 1600px) {
    padding: 12px 46px;
  }

  @media (max-width: 1200px) {
    padding: 11px 41px;
  }

  @media (max-width: 992px) {
    padding: 8px 28px;
  }

  @media (max-width: 576px) {
    padding: 6.5px 23px;
  }

  @media (max-width: 480px) {
    padding: 5px 16px;
  }
`;

export const NavDetails = styled.div`
  display: flex;
  background-color: #fff;
  padding-bottom: 3px;
  overflow: auto;
  padding: 0 10px;
  min-height: ${({ $hasContent }) => ($hasContent ? "auto" : "140px")};

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
`;

export const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-right: 2.5px solid #f2f2f2;
`;

export const NavItemsWrapper = styled.div`
  display: flex;
  height: 100%;
  column-gap: 2px;

  @media (max-width: 1600px) {
    column-gap: 1.5px;
  }

  @media (max-width: 768px) {
    column-gap: 1px;
  }
`;

export const NavDetailItem = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 35px;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  background-color: ${({ $isActive }) =>
    $isActive ? "#f2f2f2" : "transparent"};

  &:hover {
    background-color: #f2f2f2;
  }

  &.active {
    background-color: #f2f2f2;
  }

  &.active > :nth-child(3) {
    opacity: 1;
  }

  @media (max-width: 1600px) {
    padding: 14px 32px;
  }

  @media (max-width: 1200px) {
    padding: 13px 27px;
  }

  @media (max-width: 992px) {
    padding: 12px 25px;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
  }

  @media (max-width: 576px) {
    padding: 8px 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    height: 40px;

    @media (max-width: 1600px) {
      height: 34px;
    }

    @media (max-width: 1200px) {
      height: 31px;
    }

    @media (max-width: 1200px) {
      height: 28px;
    }

    @media (max-width: 768px) {
      height: 25px;
    }

    @media (max-width: 576px) {
      height: 21px;
    }

    @media (max-width: 480px) {
      height: 17px;
    }
  }

  @media (max-width: 1600px) {
    margin-bottom: 8px;
  }

  @media (max-width: 1200px) {
    margin-bottom: 7px;
  }

  @media (max-width: 992px) {
    margin-bottom: 7px;
  }

  @media (max-width: 768px) {
    margin-bottom: 6px;
  }

  @media (max-width: 576px) {
    margin-bottom: 5px;
  }

  @media (max-width: 480px) {
    margin-bottom: 4px;
  }
`;

export const TextWrapper = styled.div`
  text-align: center;

  ${({ theme }) => theme.fontSizes.responsive}
`;

export const NavSectionTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;

  @media (max-width: 1600px) {
    padding: 4px 0;
  }

  @media (max-width: 1600px) {
    padding: 3px 0;
  }

  @media (max-width: 992px) {
    padding: 2px 0;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 550;
    color: #74777e;
    @media (max-width: 1600px) {
      font-size: 10px;
    }

    @media (max-width: 992px) {
      font-size: ${({ theme }) => theme.fontSizes.xxs};
    }

    @media (max-width: 576px) {
      font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
  }
`;
