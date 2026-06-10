export const resetMaterialFields = (setFormData) => {
  setFormData((prev) => ({
    ...prev,
    metal_type: null,
    thickness: null,
    width: null,
    unit_weight: null,
    scrap_per_unit_weight: null,
    is_simplified: false,
  }));
};
