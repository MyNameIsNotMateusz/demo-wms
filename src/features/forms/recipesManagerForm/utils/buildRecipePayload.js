export const buildRecipePayload = ({ formData, recipeMaterials }) => {
  const process = recipeMaterials.find(
    (p) => p.process === formData.process_type,
  );

  const inputs = process ? process.inputs : [];

  return {
    output_material_code: formData.output_material_code,
    process_type: formData.process_type,
    output_qty: "1.000",
    items: inputs.map((input) => ({
      input_material_code: input.material_code,
      quantity: parseFloat(input.quantity).toFixed(1),
      alternative_group: input.alternative_group ?? null,
    })),
  };
};
