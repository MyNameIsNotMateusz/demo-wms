import autoTable from "jspdf-autotable";

export const addContractorsSection = ({
  pdf,
  companyInfo,
  contractorInfo,
  startY,
  gap,
  pageWidth,
}) => {
  const halfPageWidth = (pageWidth - 10 * 2 - gap) / 2;

  autoTable(pdf, {
    startY,
    body: [
      [
        {
          content: "Supplier",
          rowSpan: 3,
          styles: {
            valign: "middle",
            halign: "center",
            fontStyle: "bold",
          },
        },
        "Tax ID",
        companyInfo.nip,
      ],
      ["Address", companyInfo.address],
      ["Company", companyInfo.name],
    ],
    theme: "grid",
    styles: {
      font: "Roboto-Regular",
      fontSize: 6.5,
      cellPadding: 1.5,
      halign: "left",
      valign: "middle",
      overflow: "linebreak",
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 25 },
      2: { cellWidth: halfPageWidth - 50 },
    },
    tableWidth: halfPageWidth,
    margin: { left: 10 },
  });

  autoTable(pdf, {
    startY,
    body: [
      [
        {
          content: "Receiver",
          rowSpan: 3,
          styles: {
            valign: "middle",
            halign: "center",
            fontStyle: "bold",
          },
        },
        "Tax ID",
        contractorInfo.nip,
      ],
      ["Address", contractorInfo.address],
      ["Name", contractorInfo.name],
    ],
    theme: "grid",
    styles: {
      font: "Roboto-Regular",
      fontSize: 6.5,
      cellPadding: 1.5,
      halign: "left",
      valign: "middle",
      overflow: "linebreak",
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 25 },
      2: { cellWidth: halfPageWidth - 50 },
    },
    tableWidth: halfPageWidth,
    margin: { left: 10 + halfPageWidth + gap },
  });

  return pdf.lastAutoTable.finalY;
};
