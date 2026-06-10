import styled from "styled-components";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const UploadButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #1e293b;
  }

  &:active {
    background-color: #f1f5f9;
    transform: translateY(1px);
  }

  > svg {
    color: ${({ theme }) => theme.colors.primary};
    height: 16px;
  }
`

export const UploadButton = ({ onClick }) => {
    return (
        <UploadButtonStyled
            onClick={onClick}
        >
            <ArrowUpTrayIcon />
            Upload Image
        </UploadButtonStyled>
    )
}