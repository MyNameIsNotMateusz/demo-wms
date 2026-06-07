import { v4 as uuidv4 } from "uuid";

export const addPallet = (e, dispatch, addPalletRow) => {
  e.preventDefault();

  const uniqueId = uuidv4();

  const newRow = {
    client: "",
    project: "",
    pallet_id: "",
    material_code: "",
    status: "OK",
    quantity: 0,
    unique_id: uniqueId,
  };

  dispatch(addPalletRow(newRow));
};

const validateEditedPallets = (selectedIds, editedPallets) => {
  return !editedPallets
    .filter((pallet) => selectedIds.includes(pallet.id))
    .some(
      (pallet) =>
        pallet.quantity !== pallet.originalQuantity ||
        pallet.status !== pallet.originalStatus,
    );
};

export const handleMovePallets = (
  e,
  selectedPallets,
  setSelectedPallets,
  reducer,
  dispatch,
  handleError,
  editedPallets = [],
  checkEditedPallets = false,
) => {
  e.preventDefault();

  const selectedIds = Object.keys(selectedPallets);

  if (!selectedIds.length) {
    handleError("You have not selected any pallet.");
    return;
  }

  if (checkEditedPallets) {
    const isValid = validateEditedPallets(selectedIds, editedPallets);

    if (!isValid) {
      handleError("Edited pallets cannot be restored.");
      return;
    }
  }

  dispatch(reducer(selectedIds));

  setSelectedPallets({});
};
