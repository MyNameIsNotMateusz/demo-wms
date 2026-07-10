export const validatePlannedInbound = ({
  formData,
  selectedPlannedDeliveries,
  deliveryItems,
  handleError,
}) => {
  if (Object.keys(selectedPlannedDeliveries).length === 0) {
    handleError("Please select a planned delivery.");
    return false;
  }

  if (!formData.operator_name.trim()) {
    handleError("Please enter the operator name.");
    return false;
  }

  if (deliveryItems.some((item) => Number(item.quantity) <= 0)) {
    handleError("Every item must have quantity greater than 0.");
    return false;
  }

  if (deliveryItems.some((item) => item.isNew === true && !item.name)) {
    handleError("Every new item must have a valid material.");
    return false;
  }

  return true;
};
