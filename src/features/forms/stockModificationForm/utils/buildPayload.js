export const buildPayload = (
  userName,
  remarks,
  removedPallets,
  editedPallets,
  addedPallets,
) => {
  const pallet_to_remove = removedPallets.map((pallet) => pallet.id);

  const pallet_to_add = addedPallets.map(
    ({ pallet_id, material_code, quantity, status }) => ({
      pallet_id,
      material_code,
      quantity,
      status,
    }),
  );
  const pallet_to_edit = editedPallets.map(({ id, quantity, status }) => ({
    pallet_id: id,
    quantity: Number(quantity),
    status,
  }));

  return {
    operator_name: userName,
    remarks,
    pallet_to_remove,
    pallet_to_add,
    pallet_to_edit,
  };
};
