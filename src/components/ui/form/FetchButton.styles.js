import styled from "styled-components";

export const FetchButtonStyled = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  left: 105%;
  top: 0;
  padding: 4px;
  border: none;
  background-color: ${({ $active }) => ($active ? "#0159c3" : "#f2f2f2")};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $active }) => ($active ? "#0159c3" : "#ccc")};
  border-radius: 2px;
  cursor: pointer;
  height: 100%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ButtonText = styled.p`
  color: #000;
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  font-weight: 500;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;
