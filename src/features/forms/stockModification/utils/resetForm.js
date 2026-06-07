export const resetForm = (
  setFormData,
  setSelectedPallets,
  setSelectedRemovedPallets,
  setSelectedEditedPallets,
  setSelectedAddedPallets,
  dispatch,
  clearStockModification,
) => {
  setFormData({
    remarks: "",
  });

  setSelectedPallets({});
  setSelectedRemovedPallets({});
  setSelectedEditedPallets({});
  setSelectedAddedPallets({});

  dispatch(clearStockModification());
};
