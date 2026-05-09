import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const fetchShipments = async ({ contractorTaxId, accessToken }) => {
  if (!contractorTaxId) return [];

  const url = `${BASE_API_URL}warehouse/logistics/shipments/list/?contractor=${contractorTaxId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: DEFAULT_HEADERS(accessToken),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch shipments");
  }

  return response.json();
};
