import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const fetchAvailablePallets = async ({
  shipments,
  selectedShipments,
  accessToken,
}) => {
  const selected = shipments.find(
    ({ document_number }) =>
      document_number === Object.keys(selectedShipments)[0],
  );

  if (!selected) {
    return [];
  }

  const contractorTaxId = selected.contractor.tax_id;

  let projectType;

  if (selected.outbound_type === "SHIPMENT_CUSTOMER") {
    projectType = "SALES";
  } else if (selected.outbound_type === "SHIPMENT_SERVICE") {
    projectType = "SERVICE";
  } else {
    return [];
  }

  const url = `${BASE_API_URL}warehouse/production/pallets/?contractor=${contractorTaxId}&project_type=${projectType}`;

  const response = await fetch(url, {
    method: "GET",
    headers: DEFAULT_HEADERS(accessToken),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pallets");
  }

  return response.json();
};
