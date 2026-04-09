import styled from "styled-components";

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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
            >
                <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                />
            </svg>
            Upload Image
        </UploadButtonStyled>
    )
}