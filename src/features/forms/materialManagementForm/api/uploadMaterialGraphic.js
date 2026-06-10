export const uploadMaterialGraphic = async ({
  file,
  id,
  BASE_API_URL,
  DEFAULT_HEADERS,
  accessToken,
  handleError,
}) => {
  try {
    const formData = new FormData();
    formData.append("material_id", id);
    formData.append("graphic_file", file);

    const response = await fetch(
      `${BASE_API_URL}common/materials/upload-graphic/`,
      {
        method: "POST",
        headers: DEFAULT_HEADERS(accessToken),
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      handleError(errorData.message || "Uploading graphic failed");
    }
  } catch {
    handleError("An unexpected error occurred while uploading the graphic.");
  }
};
