export const adjustColumnWidths = (tableOrigin) => {
  const table = document.querySelector(`[data-table-origin="${tableOrigin}"]`);
  const headerCells = table.querySelectorAll("thead .tableCell");

  headerCells.forEach((headerCell) => {
    const width = getComputedStyle(headerCell).width;
    const columnIndex = headerCell.cellIndex;

    const columnCells = table.querySelectorAll(
      `tbody td:nth-child(${columnIndex + 1})`,
    );
    columnCells.forEach((cell) => {
      cell.style.width = width;
      cell.style.minWidth = width;
      cell.style.maxWidth = width;
    });

    headerCell.style.width = width;
    headerCell.style.minWidth = width;
    headerCell.style.maxWidth = width;
  });
};

