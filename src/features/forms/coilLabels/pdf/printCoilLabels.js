import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { renderCoilLabel } from "./CoilLabelTemplate";

export const printCoilLabels = async (coils) => {
  if (!coils || coils.length === 0) {
    return;
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [100, 60],
  });

  for (let i = 0; i < coils.length; i++) {
    const coil = coils[i];

    const qrDataUrl = await QRCode.toDataURL(coil.coil_id, {
      width: 256,
      margin: 1,
    });

    const coilWithQr = {
      ...coil,
      qrDataUrl,
    };

    if (i > 0) {
      pdf.addPage();
    }

    renderCoilLabel(pdf, coilWithQr);
  }

  pdf.autoPrint();

  const blobUrl = pdf.output("bloburl");

  window.open(blobUrl, "_blank");
};
