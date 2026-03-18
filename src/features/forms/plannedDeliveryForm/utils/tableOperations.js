import { v4 as uuidv4 } from "uuid";

export const handleRemoveSelectedRows = (
  selectedRows,
  data,
  setSelectedRows,
  reducer,
  dispatch,
  handleError,
) => {
  const idsToRemove = Object.keys(selectedRows);

  if (idsToRemove.length === 0) {
    handleError("No row selected.");
    return false;
  }

  if (idsToRemove.length === 1) {
    const onlyId = idsToRemove[0];
    const indexToRemove = data.findIndex((row) => row.id === onlyId);

    const nextItem =
      data[indexToRemove + 1] &&
      !idsToRemove.includes(String(data[indexToRemove + 1].id))
        ? data[indexToRemove + 1]
        : data[indexToRemove - 1] &&
            !idsToRemove.includes(String(data[indexToRemove - 1].id))
          ? data[indexToRemove - 1]
          : null;

    dispatch(reducer(idsToRemove));
    setSelectedRows(nextItem ? { [nextItem.id]: true } : {});
  } else {
    dispatch(reducer(idsToRemove));
    setSelectedRows({});
  }

  return true;
};

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

export const addDeliveryRow = (
  selectedDeliveryId,
  handleError,
  dispatch,
  reducer,
) => {
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
