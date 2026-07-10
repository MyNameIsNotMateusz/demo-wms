import { printCoilLabels } from "../../../../utils/pdf/coilLabels/printCoilLabels";

export const printInboundLabels = (result) => {
  if (!result?.items?.length) {
    return;
  }

  const labels = result.items
    .filter((item) => item.coil_id)
    .map((item) => ({
      coil_id: item.coil_id,
      material_code: item.material_code,
      metal_type: item.metal_type,
      batch: item.batch ?? "",
      width: item.width,
      thickness: item.thickness,
      weight: item.weight
        ? Number(item.weight).toLocaleString("de-DE", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          })
        : null,
      unit: item.unit,
      printed_date: new Date()
        .toLocaleString("sv-SE")
        .replace("T", " ")
        .slice(0, 16),
    }));

  if (labels.length > 0) {
    printCoilLabels(labels);
  }
};
