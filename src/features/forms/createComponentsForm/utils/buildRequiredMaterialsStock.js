export const buildRequiredMaterialsStock = ({ inputs, recipes }) => {
  const grouped = {};

  inputs.forEach((input) => {
    const groupKey =
      input.alternative_group ?? `required-${input.material_code}`;

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }

    grouped[groupKey].push({
      material_code: input.material_code,
      availableQuantity: parseFloat(input.available_total),
      quantity: null,
    });
  });

  return Object.values(grouped).map((group) => {
    if (group.length === 1) {
      const mat = group[0];

      const recipeItem = recipes[0].inputs.find(
        (r) => r.material_code === mat.material_code,
      );

      return {
        material_code: mat.material_code,
        quantity: recipeItem ? recipeItem.quantity : null,
        availableQuantity: mat.availableQuantity,
      };
    }

    const options = group.map((mat) => {
      const recipeItem = recipes[0].inputs.find(
        (r) => r.material_code === mat.material_code,
      );

      return {
        material_code: mat.material_code,
        quantity: recipeItem ? recipeItem.quantity : null,
        availableQuantity: mat.availableQuantity,
      };
    });

    const validOptions = options.filter((opt) => opt.availableQuantity > 0);

    const selectedOption =
      validOptions.length > 0
        ? validOptions.reduce((prev, curr) =>
            curr.availableQuantity < prev.availableQuantity ? curr : prev,
          )
        : options[0];

    return {
      material_code: selectedOption.material_code,

      quantity: selectedOption.quantity,

      availableQuantity: selectedOption.availableQuantity,

      options,
    };
  });
};
