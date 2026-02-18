import { Outlet } from "react-router-dom";
import {
  MainContainer,
  NavigationWrapper,
  ContentWrapper,
  DarkOverlay,
} from "./AppLayout.styles";
import { Toaster } from "sonner";
import { useState } from "react";
import { Navbar } from "./Navbar";

export const AppLayout = () => {
  const [isTableDarkened, setIsTableDarkened] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const handleOpenForm = (formName) => {
    setActiveForm((prevForm) => {
      const isSameForm = prevForm === formName;
      setIsTableDarkened(!isSameForm);
      return isSameForm ? null : formName;
    });
  };

  const handleCloseForm = () => {
    setIsTableDarkened(false);
    setActiveForm(null);
  };

  const resetState = () => {
    setIsTableDarkened(false);
    setActiveForm(null);
  };

  return (
    <MainContainer>
      <Toaster richColors position="top-center" />
      <DarkOverlay $isVisible={isTableDarkened} />
      <NavigationWrapper>
        <Navbar
          handleOpenForm={handleOpenForm}
          activeForm={activeForm}
          resetState={resetState}
        />
      </NavigationWrapper>
      <ContentWrapper>
        <Outlet
          context={{
            isTableDarkened,
            activeForm,
            handleCloseForm,
          }}
        />
      </ContentWrapper>
    </MainContainer>
  );
};
