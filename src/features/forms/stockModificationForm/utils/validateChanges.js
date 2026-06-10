export const validateChanges = (
  pallets,
  removedPallets,
  editedPallets,
  addedPallets,
  handleError,
) => {
  if (!removedPallets.length && !editedPallets.length && !addedPallets.length) {
    handleError("No changes detected.");
    return false;
  }

  if (addedPallets.length) {
    for (const pallet of addedPallets) {
      if (!pallet.client || !pallet.project || !pallet.material_code) {
        handleError("Please complete all required fields for added pallets.");

        return false;
      }

      if (Number(pallet.quantity) <= 0) {
        handleError("Quantity must be greater than 0.");

        return false;
      }
    }

    const palletIds = addedPallets.map((pallet) =>
      pallet.pallet_id.toLowerCase(),
    );

    const duplicates = palletIds.length !== new Set(palletIds).size;

    if (duplicates) {
      handleError("Duplicate pallet IDs detected.");

      return false;
    }

    const existingIds = [...pallets, ...removedPallets, ...editedPallets].map(
      (pallet) => pallet.id.toLowerCase(),
    );

    const alreadyExists = palletIds.some(
      (id) => id !== "" && existingIds.includes(id),
    );

    if (alreadyExists) {
      handleError("The specified pallet already exists.");

      return false;
    }
  }

  return true;
};
