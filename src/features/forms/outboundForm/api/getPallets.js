import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const getPallets = async (outboundType, taxId, accessToken) => {
  let url = `${BASE_API_URL}warehouse/production/pallets/?contractor=${taxId}`;

  if (outboundType === "SHIPMENT_CUSTOMER") {
    url += "&project_type=SALES";
  }

  if (outboundType === "SHIPMENT_SERVICE") {
    url += "&project_type=SERVICE";
  }

  const response = await fetch(url, {
    headers: DEFAULT_HEADERS(accessToken),
  });

  if (!response.ok) {
    throw new Error("Failed to load pallets.");
  }

  return response.json();
};
