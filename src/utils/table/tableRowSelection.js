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

export const handleRowClick = (id, setter, multiple = true) => {
  setter((prev) => {
    if (multiple) {
      const newState = { ...prev };
      if (newState[id]) {
        delete newState[id];
      } else {
        newState[id] = true;
      }
      return newState;
    } else {
      return prev[id] ? {} : { [id]: true };
    }
  });
};
