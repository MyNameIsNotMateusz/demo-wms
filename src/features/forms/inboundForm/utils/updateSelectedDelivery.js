export const updateSelectedDelivery = ({
  delivery,
  dispatch,
  setDeliveryItems,
  setPlannedSeqNumbers,
  setPlannedCodes,
  setFormData,
  updateFormData,
  setActiveTab,
}) => {
  dispatch(setDeliveryItems(delivery));

  setPlannedSeqNumbers([
    ...new Set(delivery.items.map((item) => item.material.seq_number)),
  ]);

  setPlannedCodes([
    ...new Set(delivery.items.map((item) => item.material.material_code)),
  ]);

  updateFormData(setFormData, "contractor_tax_id", delivery.contractor_tax_id);

  setActiveTab(1);
};
