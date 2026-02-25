import styled from "styled-components";

export const StyledFormCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 50%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #e8e8e8;
`;

export const FormCardHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  justify-content: start;

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

export const FormCardTitle = styled.div`
  font-size: 16px;
  color: rgb(255, 255, 255);
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FormCardBody = styled.div`
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
