export const addDeliveryRow = (
  selectedDeliveryId,
  handleError,
  dispatch,
  reducer,
  uuidv4,
) => {
  console.log(selectedDeliveryId);
  if (!Object.keys(selectedDeliveryId)[0]) {
    handleError("Please select a delivery first.");
    return false;
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
    isNew: true,
  };

  dispatch(reducer(newRow));
  return true;
};
