export const addPlannedDelivery = async (
  formData,
  plannedItems,
  handleError,
  handleSuccess,
  setIsLoading,
  apiBaseUrl,
  defaultHeaders,
  accessToken,
) => {
  const { contractor_tax_id, planned_date } = formData;

  if (!contractor_tax_id) {
    return handleError("Please select a contractor.");
  }

  if (!planned_date) {
    return handleError("Planned date cannot be empty.");
  }

  if (!plannedItems || plannedItems.length === 0) {
    return handleError("No items to submit.");
  }

  const hasEmptyRow = plannedItems.some((item) => !item.name);
  if (hasEmptyRow) {
    return handleError("Some added rows are empty.");
  }

  const invalidQuantity = plannedItems.some(
    (item) => item.planned_quantity <= 0,
  );
  if (invalidQuantity) {
    return handleError("All items must have planned quantity greater than 0.");
  }

  const payload = {
    ...formData,
    items: plannedItems.map((item) => ({
      material_code: item.material_code,
      planned_quantity: item.planned_quantity,
    })),
  };

  setIsLoading(true);

  try {
    const response = await fetch(
      `${apiBaseUrl}warehouse/logistics/planned_inbound/upsert/`,
      {
        method: "POST",
        headers: defaultHeaders(accessToken),
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to submit data.");
    }

    handleSuccess("Operation completed successfully.");
    return true;
  } catch (error) {
    console.error("Error submitting planned inbound:", error);
    handleError("Failed to submit planned inbound.");
    return false;
  } finally {
    setIsLoading(false);
  }
};
