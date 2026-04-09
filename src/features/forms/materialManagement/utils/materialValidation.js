export const validateMaterialForm = (data, handleError) => {
  const requiredFields = [
    "code",
    "seq_number",
    "name",
    "type",
    "unit",
    "destination",
  ];

  const isMissing = requiredFields.some((key) => !data[key]);
  if (isMissing) {
    handleError("Please fill all required fields.");
    return false;
  }

  if (data.type === "COIL") {
    if (!data.metal_type || data.thickness == null || data.width == null) {
      handleError("Please fill all required fields.");
      return false;
    }
  }

  if (data.type === "FG" || data.type === "WIP") {
    if (
      data.is_simplified == null ||
      data.unit_weight == null ||
      data.scrap_per_unit_weight == null
    ) {
      handleError("Please fill all required fields.");
      return false;
    }

    if (Number(data.unit_weight) <= Number(data.scrap_per_unit_weight)) {
      handleError("Unit Weight must be greater than Scrap Per Unit Weight.");
      return false;
    }
  }

  return true;
};
