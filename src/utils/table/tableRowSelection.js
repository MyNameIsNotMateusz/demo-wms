export const selectAllRows = (displayedData, setter, idKey) => {
  const newSelectedRows = {};

  displayedData.forEach((item) => {
    const key = item[idKey];
    newSelectedRows[key] = true;
  });

  setter(newSelectedRows);
};

export const deselectAllRows = (setter) => {
  setter({});
};
