import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../../api/config";

export const handleSimpleProduction = async ({
  accessToken,
  formData,
  createdPallets,
  handleError,
}) => {
  const items = createdPallets.map(({ id, ...rest }) => ({
    ...rest,

    coil_instance_id: formData.coil === "" ? null : formData.coil,
  }));

  const jsonPayload = {
    operator_name: formData.operator_name,
    production_order_number: formData.production_order_number,
    remarks: formData.remarks || "",
    items,
  };

  const response = await fetch(
    `${BASE_API_URL}warehouse/production/create-pallet/`,
    {
      method: "POST",
      headers: DEFAULT_HEADERS(accessToken),
      body: JSON.stringify(jsonPayload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Backend error:", data);

    handleError(data.message || "Operation failed.");

    return null;
  }

  return data;
};
