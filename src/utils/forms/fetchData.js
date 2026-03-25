import { BASE_API_URL, DEFAULT_HEADERS } from "../../api/config";

export const fetchData = async ({ endpoint, accessToken }) => {
  const url = `${BASE_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: DEFAULT_HEADERS(accessToken),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Błąd z backendu:", errorBody);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Request failed:", err);
    return null;
  }
};
