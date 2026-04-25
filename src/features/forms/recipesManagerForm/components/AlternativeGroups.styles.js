import styled from "styled-components";

export const AlternativeGroupsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  scrollbar-gutter: stable;
  margin-bottom: 5px;
  row-gap: 16px;

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
