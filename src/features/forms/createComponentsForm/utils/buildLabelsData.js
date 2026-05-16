export const buildLabelsData = (items, materialCode) => {
  return items.map((item) => ({
    id: item.pallet_id,

    material_code: materialCode,

    quantity: Number(item.quantity),

    sequenceNumber: item.material_seq_num,
  }));
};
