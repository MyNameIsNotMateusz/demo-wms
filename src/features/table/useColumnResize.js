export const startColumnResize = (
  e,
  columnIndex,
  adjustColumnWidths,
  tableOrigin,
  setSavedColumnWidths,
) => {
  document.body.style.pointerEvents = "none";
  document.body.style.userSelect = "none";

  adjustColumnWidths(tableOrigin);

  const tableContainer = document.querySelector(".table-container");
  const frozenScrollLeft = tableContainer.scrollLeft;

  const lockScroll = () => {
    tableContainer.scrollLeft = frozenScrollLeft;
  };

  tableContainer.addEventListener("scroll", lockScroll);

  const cells = document.querySelectorAll(
    `[data-column-index='${columnIndex}']`,
  );
  const startX = e.clientX;
  const startWidth = cells[0].offsetWidth;

  const onMouseMove = (moveEvent) => {
    let newWidth = startWidth + (moveEvent.clientX - startX);
    newWidth = Math.max(50, newWidth);

    cells.forEach((cell) => {
      cell.style.minWidth = newWidth + "px";
      cell.style.width = newWidth + "px";
      cell.style.maxWidth = newWidth + "px";
    });
  };

  const onMouseUp = () => {
    document.body.style.pointerEvents = "auto";
    document.body.style.userSelect = "auto";

    let finalWidth = cells[0].offsetWidth;

    setSavedColumnWidths((prev) => ({
      ...prev,
      [columnIndex]: finalWidth + "px",
    }));

    tableContainer.removeEventListener("scroll", lockScroll);
    document.removeEventListener("mousemove", onMouseMove);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp, { once: true });
};
