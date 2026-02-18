import styled from "styled-components";

export const FormCardWrapper = styled.div`
  display: flex;
  flex: 1;
  column-gap: 16px;

  @media (max-width: 1600px) {
    column-gap: 14px;
  }

  @media (max-width: 1200px) {
    column-gap: 12px;
  }

  @media (max-width: 768px) {
    column-gap: 10px;
  }

  @media (max-width: 480px) {
    column-gap: 7px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  column-gap: 16px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 1600px) {
    column-gap: 14px;
  }

  @media (max-width: 1200px) {
    column-gap: 12px;
  }

  @media (max-width: 768px) {
    column-gap: 10px;
  }

  @media (max-width: 480px) {
    column-gap: 7px;
  }
`;
