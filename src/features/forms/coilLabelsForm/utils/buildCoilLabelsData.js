export const buildCoilLabelsData = (selectedCoils, printedCoils) => {
  if (Object.keys(selectedCoils).length === 0 || printedCoils.length === 0) {
    return [];
  }

  const selectedIds = Object.keys(selectedCoils);

  return printedCoils
    .filter((coil) => selectedIds.includes(coil.coil_id))
    .map((coil) => ({
      coil_id: coil.coil_id ?? "",
      material_code: coil.material_code ?? "",
      metal_type: coil.metal_type ?? "",
      batch: coil.batch ?? "",
      width: coil.width ?? null,
      thickness: coil.thickness ?? null,
      weight: coil.weight ? Number(coil.weight) : null,
      unit: coil.unit,
      printed_date: null,
    }));

};
