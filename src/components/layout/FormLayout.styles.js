import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 5000;
  overflow: auto;
  height: 95%;
  max-height: 95%;
  width: 75%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #e8e8e8;

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

export const FormHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  text-align: center;

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

export const FormHeaderText = styled.div`
  margin: 0;
  font-size: 18px;
  color: rgb(255, 255, 255);

  @media (max-width: 1600px) {
    font-size: 16px;
  }

  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 1200px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const CloseButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  @media (max-width: 1600px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 1200px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 992px) {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
  }
`;

export const Line = styled.div`
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: #fff;
  border-radius: 30px;

  &.one {
    transform: rotate(45deg);
  }

  &.two {
    transform: rotate(135deg);
  }

  @media (max-width: 1600px) {
    height: 2px;
    width: 20px;
  }

  @media (max-width: 1200px) {
    height: 1.5px;
    width: 15px;
  }

  @media (max-width: 992px) {
    height: 1px;
    width: 13px;
  }

  @media (max-width: 768px) {
    width: 12px;
  }

  @media (max-width: 480px) {
    width: 10px;
  }
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  min-height: 0;
  flex: 1;
  padding: 16px;

  @media (max-width: 1600px) {
    padding: 14px;
    row-gap: 14px;
  }

  @media (max-width: 1200px) {
    padding: 12px;
    row-gap: 12px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    row-gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 7px;
    row-gap: 7px;
  }
`;
