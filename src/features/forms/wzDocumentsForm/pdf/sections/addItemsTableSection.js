import autoTable from "jspdf-autotable";

export const addItemsTableSection = ({ pdf, pallets, startY }) => {
  const tableData = (pallets || []).map((pallet) => [
    pallet.material_name,
    pallet.material_code,
    pallet.quantity,
    "EA",
    "",
  ]);

  const totalQuantity = tableData.reduce(
    (sum, row) => sum + Number(row[2] || 0),
    0,
  );

  const tableWithTotal = [
    ...tableData,
    [
      {
        content: "Total",
        colSpan: 2,
        styles: {
          halign: "left",
          fontStyle: "bold",
        },
      },
      {
        content: totalQuantity.toString(),
        styles: { fontStyle: "bold" },
      },
      {
        content: "EA",
        styles: { fontStyle: "bold" },
      },
      {
        content: "",
      },
    ],
  ];

  autoTable(pdf, {
    startY,
    head: [["Part Name", "Part No.", "Quantity", "EA", "Remarks"]],
    body: tableWithTotal,
    theme: "grid",

    headStyles: {
      fillColor: [52, 37, 134],
      textColor: [255, 255, 255],
      halign: "start",
    },

    styles: {
      font: "Roboto-Regular",
      fontSize: 6.5,
      halign: "start",
      cellPadding: 1.5,
    },

    tableWidth: "auto",
    margin: {
      left: 10,
      right: 10,
    },

    showHead: "firstPage",
  });

  return pdf.lastAutoTable.finalY;
};
