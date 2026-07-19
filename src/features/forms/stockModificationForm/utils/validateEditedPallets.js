export const validateEditedPallets = (selectedIds, editedPallets) => {
  return !editedPallets
    .filter((pallet) => selectedIds.includes(pallet.id))
    .some(
      (pallet) =>
        pallet.quantity !== pallet.originalQuantity ||
        pallet.status !== pallet.originalStatus,
    );
};
