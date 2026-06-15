export const prepareCoilLabelsForPrint = (selectedCoil, returnedWeight) => {
  return [
    {
      coil_id: selectedCoil.coil_id ?? "",
      material_code: selectedCoil.material_code ?? "",
      metal_type: selectedCoil.metal_type ?? "",
      batch: selectedCoil.batch ?? "",
      width: selectedCoil.width ?? null,
      thickness: selectedCoil.thickness ?? null,
      weight: returnedWeight,
      unit: selectedCoil.unit ?? "",
      printed_date: null,
    },
  ];
};
