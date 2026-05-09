export const groupPalletsByMaterial = (pallets = []) => {
  const grouped = {};

  pallets.forEach((pallet) => {
    const { material_code, material_name, quantity } = pallet;

    if (!grouped[material_code]) {
      grouped[material_code] = {
        material_code,
        material_name,
        quantity: 0,
      };
    }

    grouped[material_code].quantity += quantity;
  });

  return Object.values(grouped);
};
