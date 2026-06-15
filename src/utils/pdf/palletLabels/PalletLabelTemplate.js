export const renderPalletLabel = (pdf, data) => {
  const width = 45;
  const height = 45;
  const margin = 1.5;

  const idText = data.id || "";
  const materialCode = data.material_code || "";
  const fontSizeId = 7;

  const renderBoldId = (fullId, boldPart, startY) => {
    let currentY = startY;
    const maxLines = 3;
    let drawnLines = 0;

    const idx = fullId.indexOf(boldPart);
    let after = "";

    if (idx !== -1) {
      after = fullId.slice(0, idx) + fullId.slice(idx + boldPart.length);
    } else {
      after = fullId;
    }

    pdf.setFontSize(fontSizeId);

    const maxLineWidth = (width - margin * 2) * 1.03;

    const drawLines = (lines) => {
      for (let i = 0; i < lines.length && drawnLines < maxLines; i++) {
        const line = lines[i];
        const isLastAllowedLine =
          drawnLines === maxLines - 1 && i < lines.length - 1;
        const textToDraw = isLastAllowedLine ? line.slice(0, -2) + "..." : line;
        pdf.text(textToDraw, width / 2, currentY, { align: "center" });
        currentY += 3.5;
        drawnLines++;
      }
    };

    pdf.setFont(undefined, "bold");
    drawLines(pdf.splitTextToSize(boldPart, maxLineWidth));

    if (drawnLines < maxLines) {
      pdf.setFont(undefined, "normal");
      drawLines(pdf.splitTextToSize(after, maxLineWidth));
    }

    return drawnLines;
  };

  const yStart = margin + 2;
  const idLines = renderBoldId(idText, materialCode, yStart);
  const yAfterId = yStart + (idLines - 1) * 3.5;

  let qrSize = 25;
  if (idLines > 1) qrSize -= 3;

  pdf.setFontSize(6);
  const maxValueWidth = width - margin * 2 - 2;

  const seqLines = pdf.splitTextToSize(
    data.sequenceNumber || "",
    maxValueWidth,
  );
  const qtyLines = pdf.splitTextToSize(
    data.quantity?.toString() || "",
    maxValueWidth,
  );

  const maxLines = Math.max(seqLines.length, qtyLines.length);
  if (maxLines > 1) qrSize -= (maxLines - 1) * 2;

  const tableHeight = 9;
  const tableStartY = height - 1.5 - tableHeight;
  const yQr = tableStartY - qrSize - 1.5;
  const xQr = (width - qrSize) / 2;

  if (data.qrDataUrl) {
    pdf.addImage(data.qrDataUrl, "PNG", xQr, yQr, qrSize, qrSize);
  } else {
    pdf.rect(xQr, yQr, qrSize, qrSize);
  }

  const colWidth = (width - margin * 2) / 2;
  const rowHeight = 4.5;

  pdf.line(margin, tableStartY, width - margin, tableStartY);
  pdf.line(
    margin,
    tableStartY + rowHeight,
    width - margin,
    tableStartY + rowHeight,
  );
  pdf.line(
    margin,
    tableStartY + rowHeight * 2,
    width - margin,
    tableStartY + rowHeight * 2,
  );

  pdf.line(margin, tableStartY, margin, tableStartY + rowHeight * 2);
  pdf.line(
    margin + colWidth,
    tableStartY,
    margin + colWidth,
    tableStartY + rowHeight * 2,
  );
  pdf.line(
    width - margin,
    tableStartY,
    width - margin,
    tableStartY + rowHeight * 2,
  );

  const centerYHeader = (row) => tableStartY + rowHeight * (row + 0.5) + 0.6;
  const centerYValue = (row) => tableStartY + rowHeight * (row + 0.5) + 0.8;

  pdf.setFontSize(5.5);
  pdf.setFont(undefined, "bold");
  pdf.text("Seq. nub", margin + colWidth / 2, centerYHeader(0), {
    align: "center",
  });
  pdf.text("Quantity", margin + colWidth + colWidth / 2, centerYHeader(0), {
    align: "center",
  });

  pdf.setFontSize(6);
  pdf.setFont(undefined, "normal");
  pdf.text(
    data.sequenceNumber?.toString() || "",
    margin + colWidth / 2,
    centerYValue(1),
    { align: "center" },
  );
  pdf.text(
    data.quantity?.toString() || "",
    margin + colWidth + colWidth / 2,
    centerYValue(1),
    { align: "center" },
  );
};
