import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const lookupMaterial = async (key, value, token) => {
  let queryParam = "";
  if (key === "material_code") queryParam = `material_code=${value}`;
  if (key === "seq_number") queryParam = `seq_number=${value}`;

  const url = `${BASE_API_URL}common/materials/lookup/?${queryParam}`;

  const response = await fetch(url, {
    method: "GET",
    headers: DEFAULT_HEADERS(token),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch material data");
  }

  return await response.json();
};
