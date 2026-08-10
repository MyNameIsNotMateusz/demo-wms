export const validateProductionForm = ({
  isAssemblyMode,
  createdPallets,
  formData,
  handleError,
}) => {
  if (isAssemblyMode === null) {
    return false;
  }

  if (!["FG", "WIP"].includes(formData.type)) {
    handleError("The production material must be either WIP or FG.");
    return false;
  }

  if (!createdPallets.length) {
    handleError("No pallets created.");
    return false;
  }

  if (!formData.operator_name) {
    handleError("Please enter operator name.");
    return false;
  }

  const hasInvalidQuantity = createdPallets.some(
    (item) => Number(item.quantity) <= 0,
  );

  if (hasInvalidQuantity) {
    handleError("All item quantities must be greater than 0.");

    return false;
  }

  return true;
};
