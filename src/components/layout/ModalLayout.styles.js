import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #e8e8e8;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  justify-content: center;

  @media (max-width: 1600px) {
    padding: 14px;
  }

  @media (max-width: 1200px) {
    padding: 12px;
  }

  @media (max-width: 992px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

export const ModalHeaderText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: rgb(255, 255, 255);
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  min-height: 0;
  row-gap: 10px;
  overflow: auto;
  padding: 16px;

  @media (max-width: 1600px) {
    padding: 14px;
  }

  @media (max-width: 1200px) {
    padding: 12px;
  }

  @media (max-width: 992px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  padding: 16px;

  @media (max-width: 1600px) {
    padding: 14px;
  }

  @media (max-width: 1200px) {
    padding: 12px;
  }

  @media (max-width: 992px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

export const ModalButtonRow = styled.div`
  margin-top: auto;
  display: flex;
  column-gap: 16px;
  width: 100%;

  @media (max-width: 1600px) {
    flex-direction: column;
    row-gap: 14px;
  }

  @media (max-width: 1200px) {
    row-gap: 12px;
  }

  @media (max-width: 768px) {
    row-gap: 10px;
  }

  @media (max-width: 480px) {
    row-gap: 7px;
  }
`;

export const ModalButton = styled.input`
  margin-top: auto;
  width: 100%;
  padding: 7px 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
