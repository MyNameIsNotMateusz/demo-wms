import * as XLSX from "xlsx";

export const exportTableData = (data, titles) => {
  if (!data || !titles) return;

  const formattedData = data.map((row) => Object.values(row));
  formattedData.unshift(titles);

  const ws = XLSX.utils.aoa_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Tabela");
  XLSX.writeFile(wb, "tabela.xlsx");
};
