export const applyTableHeaderShadow = () => {
  const tableContainer = document.querySelector(".table-container");
  const tableHeader = document.querySelector(".table-header");

  const currentScrollY = tableContainer.scrollTop;

  if (currentScrollY > 0) {
    tableHeader.classList.add("active");
  } else {
    tableHeader.classList.remove("active");
  }
};
