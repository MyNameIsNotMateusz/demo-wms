import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const getServicePallets = async (contractorTaxId, accessToken) => {
  const payload = {
    contractor_tax_id: contractorTaxId,
  };

  const response = await fetch(`${BASE_API_URL}warehouse/pallets/service/`, {
    method: "POST",
    headers: DEFAULT_HEADERS(accessToken),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch service pallets.");
  }

  return await response.json();
};
