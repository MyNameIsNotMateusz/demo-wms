import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { renderLabel } from "./LabelTemplate";

export const printLabels = async (labels) => {
  if (!labels || labels.length === 0) {
    return;
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [45, 45],
  });

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];

    const qrDataUrl = await QRCode.toDataURL(label.id, {
      width: 256,
      margin: 1,
    });

    const labelWithQr = {
      ...label,
      qrDataUrl,
      material_code: label.material_code,
    };

    if (i > 0) {
      pdf.addPage();
    }

    renderLabel(pdf, labelWithQr);
  }

  pdf.autoPrint();

  const blobUrl = pdf.output("bloburl");

  window.open(blobUrl, "_blank");
};
