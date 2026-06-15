export const validateIssueCoil = ({
  formData,
  productionCoils,
  consumedCoils,
  handleError,
}) => {
  if (!formData.material_code) {
    handleError("Coil not found.");
    return false;
  }

  if (!formData.operator_name?.trim()) {
    handleError("Operator name is required.");
    return false;
  }

  const coilExistsInProduction = productionCoils.some(
    (coil) => coil.coil_id === formData.coil_id,
  );

  if (coilExistsInProduction) {
    handleError("This coil is already in production.");
    return false;
  }

  const coilExistsInConsumed = consumedCoils.some(
    (coil) => coil.coil_id === formData.coil_id,
  );

  if (coilExistsInConsumed) {
    handleError("This coil has already been consumed.");
    return false;
  }

  return true;
};
