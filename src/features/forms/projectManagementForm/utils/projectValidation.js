export const validateProjectForm = (
  projectFormData,
  materialsTable,
  handleError,
) => {
  if (
    !projectFormData.code?.trim() ||
    !projectFormData.name?.trim() ||
    !projectFormData.type?.trim() ||
    !projectFormData.start_date?.trim()
  ) {
    handleError("All required fields must be filled in.");
    return false;
  }

  if (projectFormData.end_date) {
    if (
      new Date(projectFormData.end_date) < new Date(projectFormData.start_date)
    ) {
      handleError("End date cannot be earlier than start date.");
      return false;
    }
  }

  if (materialsTable.length > 0) {
    for (let mat of materialsTable) {
      if (!mat.type.trim() || !mat.material_code.trim()) {
        handleError(
          "Material Type and Material Code are required for all materials.",
        );
        return false;
      }
    }

    const codes = materialsTable.map((m) => m.material_code.trim());
    const uniqueCodes = new Set(codes);

    if (codes.length !== uniqueCodes.size) {
      handleError("Duplicate material codes are not allowed.");
      return false;
    }
  }

  return true;
};
