export const buildDeliveryDetailsRows = (
  selectedPlannedDeliveries,
  displayedPlannedDeliveries,
) => {
  const selectedIds = Object.keys(selectedPlannedDeliveries);

  if (selectedIds.length === 0) {
    return [];
  }

  const selectedDelivery = displayedPlannedDeliveries.find(
    (delivery) => delivery.id === selectedIds[0],
  );

  if (!selectedDelivery || !selectedDelivery.items) {
    return [];
  }

  return selectedDelivery.items.map((item) => ({
    id: item.id,
    seq_number: item.material.seq_number,
    material_code: item.material.material_code,
    name: item.material.name,
    type: item.material.type,
    planned_quantity: Math.round(parseFloat(item.planned_quantity)),
    unit: item.material.unit,
  }));
};
