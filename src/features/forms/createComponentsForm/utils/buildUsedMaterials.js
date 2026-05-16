export const buildUsedMaterials = ({
  requiredMaterialsStock,
  totalQuantity,
}) => {
  return requiredMaterialsStock.map((item) => ({
    material_code: item.material_code,

    quantity: item.quantity * totalQuantity,
  }));
};
