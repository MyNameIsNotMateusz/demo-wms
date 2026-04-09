export const fetchProjectMaterials = async ({
  projectCode,
  BASE_API_URL,
  DEFAULT_HEADERS,
  accessToken,
  dispatch,
  setMaterialsTable,
  handleError,
}) => {
  const jsonPayload = {
    project_code: projectCode,
  };

  try {
    const response = await fetch(`${BASE_API_URL}common/projects/materials/`, {
      method: "POST",
      headers: DEFAULT_HEADERS(accessToken),
      body: JSON.stringify(jsonPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Błąd podczas pobierania materiałów projektu:", errorData);
      handleError(errorData.message || "Failed to fetch materials.");
      return;
    }

    const data = await response.json();
    dispatch(setMaterialsTable(data));
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
};
