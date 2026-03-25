import styled from "styled-components";

export const ImageWrapper = styled.div`
  flex: 1;
`;

export const InputLabel = styled.label`
  position: relative;
  width: fit-content;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  margin-bottom: 1px;
  white-space: nowrap;

  ${({ theme }) => theme.fontSizes.responsive};
`;

export const ImageContent = styled.div`
  border: 2px dashed #0159c3;
  border-radius: 12px;
  padding: 24px;
  background-color: #e1e4e7;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ImageThumbnail = styled.div`
  width: 120px;
  height: 120px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 8px;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  > svg {
    height: 40px;
    color: #cbd5e1;
  }
`;

export const ImageInfo = styled.div`
  flex-grow: 1;
`;

export const ImageTitle = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const ImageDetail = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #64748b;
  margin-bottom: 16px;
`;
