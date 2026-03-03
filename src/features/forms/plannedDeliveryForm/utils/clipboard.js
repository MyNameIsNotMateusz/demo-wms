export const handlePastedMaterial = async (
  value,
  quantity,
  dispatch,
  handleMaterialLookupFn,
  applyLookupReducer,
  updateReducer,
  lookupMaterial,
  accessToken,
  addDeliveryItem,
  formData,
  uuidv4,
  handleError,
  addDeliveryItemRow
) => {
  const newRowId = addDeliveryItem(formData, uuidv4, handleError, dispatch, addDeliveryItemRow);
  if (!newRowId) return;

  const foundByCode = await handleMaterialLookupFn(
    newRowId,
    "material_code",
    value,
    dispatch,
    applyLookupReducer,
    lookupMaterial,
    accessToken,
  );

  if (!foundByCode) {
    await handleMaterialLookupFn(
      newRowId,
      "seq_number",
      value,
      dispatch,
      applyLookupReducer,
      lookupMaterial,
      accessToken,
    );
  }

  if (quantity !== 0) {
    dispatch(
      updateReducer({
        id: newRowId,
        key: "planned_quantity",
        value: quantity,
      }),
    );
  }
};
