import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { renderPalletLabel } from "./PalletLabelTemplate";

export const printPalletLabels = async (labels) => {
  if (!labels?.length) {
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
    };

    if (i > 0) {
      pdf.addPage();
    }

    renderPalletLabel(pdf, labelWithQr);
  }

  pdf.autoPrint();

  const blobUrl = pdf.output("bloburl");

  window.open(blobUrl, "_blank");
};
