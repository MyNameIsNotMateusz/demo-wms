export const validateChanges = (
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

    const removedIds = removedPallets.map((pallet) => pallet.id.toLowerCase());

    const conflictExists = palletIds.some((id) => removedIds.includes(id));

    if (conflictExists) {
      handleError(
        "The same pallet cannot be added and removed at the same time.",
      );

      return false;
    }
  }

  return true;
};
