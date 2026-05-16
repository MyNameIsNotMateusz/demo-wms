export const getTotalCreatedQuantity = (createdPallets) => {
  return createdPallets.reduce((sum, item) => sum + Number(item.quantity), 0);
};
