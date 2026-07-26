export const buildShipmentEditPayload = ({
  originalPallets,
  currentPallets,
}) => {
  const items_to_delete = originalPallets
    .filter(
      (orig) => !currentPallets.some((curr) => curr.pallet === orig.pallet),
    )
    .map((p) => ({
      stock_id: p.pallet,
    }));

  const items_to_update = originalPallets
    .filter((orig) => {
      const curr = currentPallets.find((c) => c.pallet === orig.pallet);

      return curr && Number(curr.quantity) !== Number(orig.quantity);
    })
    .map((p) => {
      const curr = currentPallets.find((c) => c.pallet === p.pallet);

      return {
        stock_id: p.pallet,
        quantity: curr.quantity.toFixed(3),
      };
    });

  const items_to_add = currentPallets
    .filter((p) => p.id && p.pallet)
    .map((p) => ({
      stock_id: p.pallet,
    }));


  return {
    items_to_delete,
    items_to_update,
    items_to_add,
  };
};
