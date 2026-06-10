export const validateDuplicatePallets = (items_to_add) => {
  const duplicatePallets = new Set();

  for (const item of items_to_add) {
    if (duplicatePallets.has(item.stock_id)) {
      return false;
    }

    duplicatePallets.add(item.stock_id);
  }

  return true;
};
