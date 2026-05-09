import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const updateShipment = async ({
  selectedDocument,
  payload,
  accessToken,
}) => {
  const url = `${BASE_API_URL}warehouse/logistics/shipments/${selectedDocument}/edit/`;

  const response = await fetch(url, {
    method: "POST",

    headers: DEFAULT_HEADERS(accessToken),

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};
