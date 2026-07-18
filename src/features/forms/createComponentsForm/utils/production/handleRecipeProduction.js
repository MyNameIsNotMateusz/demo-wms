import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../../api/config";
import { getTotalCreatedQuantity } from "../getTotalCreatedQuantity";
import { buildUsedMaterials } from "../buildUsedMaterials";

export const handleRecipeProduction = async ({
  accessToken,
  formData,
  createdPallets,
  requiredMaterialsStock,
  maxProducibleSelected,
  handleError,
}) => {
  const totalQuantity = getTotalCreatedQuantity(createdPallets);

  if (totalQuantity > maxProducibleSelected) {
    handleError(
      `You are trying to create ${totalQuantity} items, but maximum producible quantity is ${maxProducibleSelected}.`,
    );

    return null;
  }

  const usedMaterials = buildUsedMaterials({
    requiredMaterialsStock,
    totalQuantity,
  });

  const jsonPayload = {
    material_code: formData.material_code,
    used_materials: usedMaterials,
    created_pallets: createdPallets.map((item) => ({
      material_code: formData.material_code,
      status: item.status,
      quantity: item.quantity,
    })),
    operator_name: formData.operator_name,
    production_order_number: formData.production_order_number,
    remarks: formData.remarks,
  };

  const response = await fetch(
    `${BASE_API_URL}warehouse/production/production-from-recipe/`,
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
