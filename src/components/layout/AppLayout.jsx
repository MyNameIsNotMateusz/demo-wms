import { Outlet } from "react-router-dom";
import {
  MainContainer,
  NavigationWrapper,
  ContentWrapper,
  DarkOverlay,
} from "./AppLayout.styles";
import { Toaster } from "sonner";
import { useState } from "react";

export const AppLayout = () => {
  const [isTableDarkened, setIsTableDarkened] = useState(false);
  const [activeFormName, setActiveFormName] = useState(null);

  const handleOpenForm = (formName) => {
    setActiveFormName((prevForm) => {
      const isSameForm = prevForm === formName;
      setIsTableDarkened(!isSameForm);
      return isSameForm ? null : formName;
    });
  };

  const handleCloseForm = () => {
    setIsTableDarkened(false);
    setActiveFormName(null);
  };

  const resetState = () => {
    setIsTableDarkened(false);
    setActiveFormName(null);
  };

  return (
    <MainContainer>
      <Toaster richColors position="top-center" />
      <DarkOverlay $isVisible={isTableDarkened} />
      <NavigationWrapper></NavigationWrapper>
      <ContentWrapper>
        <Outlet
          context={{
            isTableDarkened,
            activeFormName,
            handleCloseForm,
          }}
        />
      </ContentWrapper>
    </MainContainer>
  );
};
