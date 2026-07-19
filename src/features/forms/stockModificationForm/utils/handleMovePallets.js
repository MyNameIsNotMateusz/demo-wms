import { validateEditedPallets } from "./validateEditedPallets";

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
