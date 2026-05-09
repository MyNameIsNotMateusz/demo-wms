import jsPDF from "jspdf";

import { companyInfo } from "./companyInfo";

import { PDF_GAP } from "./constants";

import { addHeaderSection } from "./sections/addHeaderSection";
import { addContractorsSection } from "./sections/addContractorsSection";
import { addItemsTableSection } from "./sections/addItemsTableSection";
import { addSignaturesSection } from "./sections/addSignaturesSection";

export const generateWzPdf = ({ selectedShipmentData, logo }) => {
  if (!selectedShipmentData || Object.keys(selectedShipmentData).length === 0) {
    return;
  }

  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();

  const contractorInfo = {
    name: selectedShipmentData.contractor_name || "Unknown Contractor",

    nip: selectedShipmentData.tax_id || "—",

    address: selectedShipmentData.address || "—",
  };

  const documentNumber =
    selectedShipmentData.document_number || "Document Number";

  const date = selectedShipmentData.created_at || "Date";

  addHeaderSection({
    pdf,
    logo,
    documentNumber,
    date,
    gap: PDF_GAP,
    pageWidth,
  });

  const contractorsStartY = pdf.lastAutoTable.finalY + PDF_GAP;

  const contractorsFinalY = addContractorsSection({
    pdf,
    companyInfo,
    contractorInfo,
    startY: contractorsStartY,
    gap: PDF_GAP,
    pageWidth,
  });

  addItemsTableSection({
    pdf,
    pallets: selectedShipmentData.pallets,
    startY: contractorsFinalY + PDF_GAP,
  });

  addSignaturesSection({
    pdf,
    companyInfo,
    contractorInfo,
  });

  pdf.autoPrint();

  const blobUrl = pdf.output("bloburl");

  window.open(blobUrl, "_blank");
};
