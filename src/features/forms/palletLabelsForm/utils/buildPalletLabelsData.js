export const buildPalletLabelsData = (selectedPallets, pallets) => {
  if (Object.keys(selectedPallets).length === 0 || pallets.length === 0) {
    return [];
  }

  const selectedIds = Object.keys(selectedPallets);

  return pallets
    .filter((pallet) => selectedIds.includes(pallet.pallet_id))
    .map((pallet) => ({
      id: pallet.pallet_id ?? "",
      material_code: pallet.material_code ?? "",
      sequenceNumber: pallet.material_seq_number ?? "",
      quantity: pallet.quantity ? parseFloat(pallet.quantity) : 0,
    }));
};
