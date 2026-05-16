import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const fetchRequiredMaterialsStock = async ({
  materialCode,
  accessToken,
}) => {
  const response = await fetch(
    `${BASE_API_URL}warehouse/production/material-recipe/?material_code=${materialCode}`,
    {
      headers: DEFAULT_HEADERS(accessToken),
    },
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};
