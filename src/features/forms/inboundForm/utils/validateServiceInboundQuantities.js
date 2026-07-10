export const validateServiceInboundQuantities = ({
  pallets,
  consumption,
  handleError,
}) => {
  for (const pallet of pallets) {
    const materialCode = pallet.material_code;

    const availableQuantity = Number(pallet.quantity);
    const requestedQuantity = consumption[materialCode] ?? 0;

    if (requestedQuantity > availableQuantity) {
      handleError(
        `Material "${materialCode}" exceeds the available quantity. Requested: ${requestedQuantity} ${pallet.material_unit}, Available: ${availableQuantity} ${pallet.material_unit}.`,
        10000,
      );
      return false;
    }
  }

  return true;
};
