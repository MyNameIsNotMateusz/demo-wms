export const handleScanPallet = (
  palletId,
  isScanSelectMode,
  setSelectedPallets,
) => {
  setSelectedPallets((prev) => {
    const newState = { ...prev };

    if (isScanSelectMode) {
      if (!newState[palletId]) {
        newState[palletId] = true;
      }
    } else {
      if (newState[palletId]) {
        delete newState[palletId];
      }
    }

    return newState;
  });
};
