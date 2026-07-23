export const addDeliveryItem = (
  formData,
  uuidv4,
  handleError,
  dispatch,
  addDeliveryItemRow,
) => {
  if (formData.contractor_tax_id === "") {
    handleError("Please select a contractor first.");
    return null;
  }

  const uniqueId = uuidv4();

  const newRow = {
    id: uniqueId,
    seq_number: "",
    material_code: "",
    name: "",
    type: "",
    planned_quantity: 0,
    unit: "",
  };

  dispatch(addDeliveryItemRow(newRow));

  return uniqueId;
};
