export const calculateServiceConsumption = ({ serviceItems, recipes }) => {
  const consumption = {};

  serviceItems.forEach((item) => {
    const quantity = Number(item.quantity);

    const recipe = recipes.find(
      (recipe) => recipe.output_material.code === item.material_code,
    );

    if (recipe) {
      recipe.items.forEach((recipeItem) => {
        const materialCode = recipeItem.material.code;
        const requiredQuantity = Number(recipeItem.required_quantity);

        consumption[materialCode] =
          (consumption[materialCode] ?? 0) + quantity * requiredQuantity;
      });
    } else {
      consumption[item.material_code] =
        (consumption[item.material_code] ?? 0) + quantity;
    }
  });

  return consumption;
};
