export const validateRecipe = ({ formData, materials, recipeMaterials }) => {
  if (!formData.process_type) {
    return "Please select a process before submitting.";
  }

  const selectedMaterial = materials.find(
    (m) => m.material_code === formData.output_material_code,
  );

  if (!["WIP", "FG"].includes(selectedMaterial?.type)) {
    return "The output product must be either WIP (work in progress) or FG (finished good).";
  }

  const process = recipeMaterials.find(
    (p) => p.process === formData.process_type,
  );

  const inputs = process ? process.inputs : [];

  if (inputs.length === 0) {
    return "No input materials selected for the recipe.";
  }

  const hasInvalidQuantity = inputs.some(
    (input) => Number(input.quantity) <= 0,
  );

  if (hasInvalidQuantity) {
    return "All input materials must have quantity greater than 0.";
  }

  return null;
};
