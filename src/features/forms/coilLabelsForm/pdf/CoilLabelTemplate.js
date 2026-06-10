import logoIcon from "../../../../assets/icons/logo2.png";
import { formatTextLines } from "./utils/formatTextLines";

export const renderCoilLabel = (pdf, data) => {
  const width = 100;
  const height = 60;

  const marginTopBottom = 3;
  const marginLeftRight = 4;

  const qrHeight = 14.5;
  const qrWidth = qrHeight;

  const qrX = width - marginLeftRight - qrWidth;
  const qrY = marginTopBottom;

  const logoHeight = qrHeight * 0.7;
  const logoWidth = logoHeight * (309 / 146);

  const logoX = marginLeftRight;
  const logoY = marginTopBottom;

  pdf.addImage(logoIcon, "PNG", logoX, logoY, logoWidth, logoHeight);

  const textX = qrX - 2;

  let currentY = marginTopBottom + 3;

  const coilIdFull = data.coil_id || "";

  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");

  if (coilIdFull.length > 27) {
    const firstLine = coilIdFull.slice(0, 27);
    const secondLine = coilIdFull.slice(27);

    pdf.text(firstLine, textX, currentY, {
      align: "right",
    });

    currentY += 5;

    pdf.text(secondLine, textX, currentY, {
      align: "right",
    });

    currentY += 6;
  } else {
    pdf.text(coilIdFull, textX, currentY, {
      align: "right",
    });

    currentY += 6;
  }

  pdf.text(data.printed_date || "", textX, currentY, {
    align: "right",
  });

  const lineY = qrY + qrHeight + 2;

  if (data.qrDataUrl) {
    pdf.addImage(data.qrDataUrl, "PNG", qrX, qrY, qrWidth, qrHeight);
  } else {
    pdf.rect(qrX, qrY, qrWidth, qrHeight);
  }

  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.5);

  pdf.line(0, lineY, width, lineY);

  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");

  const weightText = `${data.weight ?? ""} ${data.unit ?? ""}`;

  const offsetFromLine = 6;

  pdf.text(weightText, width - marginLeftRight, lineY + offsetFromLine, {
    align: "right",
  });

  const materialCodeText = data.material_code ?? "";

  const materialCodeLines = formatTextLines(materialCodeText);

  pdf.text(materialCodeLines, marginLeftRight, lineY + offsetFromLine, {
    align: "left",
  });

  let extraSpace = materialCodeLines.length >= 3 ? 10 : 12;

  let currentLineY =
    lineY + offsetFromLine + (materialCodeLines.length - 1) * 6 + extraSpace;

  const materialTypeText = data.metal_type ?? "";

  const batchText = data.batch ?? "";

  const combinedText = `${materialTypeText} | ${batchText}`;

  pdf.text(combinedText, marginLeftRight, currentLineY, {
    align: "left",
  });

  const bottomY = height - marginTopBottom;

  const widthText = `W:${data.width ?? ""}`;

  const thicknessText = `T:${data.thickness ?? ""}`;

  pdf.setFontSize(24);

  pdf.text(thicknessText, marginLeftRight, bottomY - 1, {
    align: "left",
  });

  const thicknessTextWidth = pdf.getTextWidth(thicknessText);

  pdf.text(widthText, marginLeftRight + thicknessTextWidth + 6, bottomY - 1, {
    align: "left",
  });
};
