export const validateManualInbound = ({
  formData,
  manualPallets,
  handleError,
}) => {
  if (!formData.contractor_tax_id) {
    handleError("Please select a contractor.");
    return false;
  }

  if (!formData.operator_name.trim()) {
    handleError("Please enter the operator name.");
    return false;
  }

  if (manualPallets.length === 0) {
    handleError("No pallet has been added.");
    return false;
  }

  if (manualPallets.some((item) => !item.name)) {
    handleError("Every pallet must have a valid material.");
    return false;
  }

  if (manualPallets.some((item) => Number(item.quantity) <= 0)) {
    handleError("Every pallet must have quantity greater than 0.");
    return false;
  }

  return true;
};
