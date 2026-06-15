export const updateCoilDetailsFormData = (setFormData, coilDetails) => {
  setFormData((prev) => ({
    ...prev,
    material_code: coilDetails?.material_code ?? "",
    material_name: coilDetails?.material_name ?? "",
    thickness: coilDetails?.thickness ?? "",
    width: coilDetails?.width ?? "",
    metal_type: coilDetails?.metal_type ?? "",
    batch: coilDetails?.batch ?? "",
    weight: coilDetails?.weight ?? "",
  }));
};
