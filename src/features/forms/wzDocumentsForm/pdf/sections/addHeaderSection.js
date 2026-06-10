import autoTable from "jspdf-autotable";

export const addHeaderSection = ({
  pdf,
  logo,
  documentNumber,
  date,
  gap,
  pageWidth,
}) => {
  if (logo) {
    try {
      pdf.addImage(logo, "PNG", 10, 10, 15, 15);
    } catch {}
  }

  const headerStartY = 10 + 15 + gap;

  autoTable(pdf, {
    startY: headerStartY,

    head: [],

    body: [
      ["Delivery No.", documentNumber],
      ["Shipment Date", date],
    ],

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 6.5,
      cellPadding: 1.5,
      cellWidth: "auto",
      halign: "left",
    },

    tableWidth: "wrap",

    margin: {
      left: 10,
    },
  });

  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(18);

  pdf.text("Transaction Contents Document", pageWidth - 10, 15, {
    align: "right",
  });
};
