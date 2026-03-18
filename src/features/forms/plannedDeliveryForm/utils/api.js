import { BASE_API_URL, DEFAULT_HEADERS } from "../../../../api/config";

export const handleMaterialLookup = async (
  id,
  key,
  value,
  dispatch,
  reducer,
  lookupMaterial,
  accessToken,
) => {
  const emptyRow = {
    id,
    name: "",
    type: "",
    unit: "",
    material_code: key === "seq_number" ? "" : undefined,
    seq_number: key === "material_code" ? "" : undefined,
  };

  if (!value) {
    dispatch(reducer(emptyRow));
    return false;
  }

  try {
    const responseData = await lookupMaterial(key, value, accessToken);

    if (!responseData || !responseData.name) {
      dispatch(reducer(emptyRow));
      return false;
    }

    dispatch(
      reducer({
        id,
        name: responseData.name,
        type: responseData.type,
        unit: responseData.unit,
        material_code: responseData.code,
        seq_number: responseData.seq_number,
      }),
    );

    return true;
  } catch (error) {
    dispatch(reducer(emptyRow));
    return false;
  }
};

export const cancelPlannedDelivery = async (
  selectedDeliveryId,
  accessToken,
  setIsLoading,
  setSelectedRows,
  dispatch,
  fetchPlannedDeliveries,
  handleSuccess,
  handleError,
) => {
  if (!Object.keys(selectedDeliveryId)[0]) {
    handleError("Please select a delivery first.");
    return;
  }

  const url = `${BASE_API_URL}warehouse/logistics/planned_inbound/change_status/`;

  const payload = {
    plan_id: Object.keys(selectedDeliveryId)[0],
    status: "CANCELLED",
  };

  try {
    setIsLoading(true);

    const response = await fetch(url, {
      method: "POST",
      headers: DEFAULT_HEADERS(accessToken),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete delivery.");
    }

    setSelectedRows({});
    dispatch(fetchPlannedDeliveries(accessToken));
    handleSuccess("Operation completed successfully.");
  } catch (error) {
    console.error("Error deleting planned delivery:", error);
    handleError("Failed to delete planned delivery.");
  } finally {
    setIsLoading(false);
  }
};

export const updatePlannedDelivery = async (
  isEdited,
  handleError,
  detailsItems,
  selectedDeliveryId,
  deletedDetailsItems,
  setIsLoading,
  accessToken,
  setDeletedDetailsItems,
  dispatch,
  fetchPlannedDeliveries,
  handleSuccess,
  setSelectedPlannedDeliveries,
) => {
  if (!isEdited) {
    handleError("No changes have been made.");
    return;
  }

  const url = `${BASE_API_URL}warehouse/logistics/planned_inbound/upsert/`;

  const newItems = detailsItems.filter((item) => item.isNew);
  const editedItems = detailsItems.filter((item) => !item.isNew);

  for (const item of newItems) {
    if (!item.name || item.planned_quantity <= 0) {
      handleError("New items must have a name and quantity greater than 0.");
      return;
    }
  }

  for (const item of editedItems) {
    if (item.planned_quantity <= 0) {
      handleError("Quantity must be greater than 0 for all items.");
      return;
    }
  }

  const payload = {
    plan_id: Object.keys(selectedDeliveryId)[0],
    items: [
      ...editedItems.map((item) => ({
        id: item.id,
        planned_quantity: item.planned_quantity,
      })),
      ...newItems.map((item) => ({
        material_code: item.material_code,
        planned_quantity: item.planned_quantity,
      })),
    ],
    deleted_items: deletedDetailsItems,
  };

  try {
    setIsLoading(true);

    const response = await fetch(url, {
      method: "POST",
      headers: DEFAULT_HEADERS(accessToken),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update preview delivery.");
    }

    setDeletedDetailsItems([]);
    setSelectedPlannedDeliveries({});
    dispatch(fetchPlannedDeliveries(accessToken));
    handleSuccess("Operation completed successfully.");
  } catch (error) {
    console.error("Error updating preview delivery:", error);
    handleError("Failed to update preview delivery.");
  } finally {
    setIsLoading(false);
  }
};
