import { ImageWrapper, InputLabel, ImageContent, ImageThumbnail, ImageInfo, ImageTitle, ImageDetail } from "./ImagePreview.styles"
import { PhotoIcon } from "@heroicons/react/24/solid";

export const ImagePreview = ({ id, label, src, name, extra }) => {
    return (
        <ImageWrapper>
            <InputLabel htmlFor={id}>
                {label}
            </InputLabel>
            <ImageContent>
                <ImageThumbnail>
                    {src ? (
                        <img alt={name} src={src} />
                    ) : (
                        <PhotoIcon />
                    )}
                </ImageThumbnail>
                <ImageInfo>
                    <ImageTitle>Material Preview</ImageTitle>
                    <ImageDetail>
                        {src ? src.split("/").pop() : "No image"}
                    </ImageDetail>
                    {extra}
                </ImageInfo>
            </ImageContent>
        </ImageWrapper>
    )
}