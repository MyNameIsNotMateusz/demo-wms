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

export const FormTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  overflow: auto;
  scrollbar-gutter: stable;
  margin-bottom: 5px;

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
