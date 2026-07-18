export const handleRemoveSelectedRows = (
  selectedRows,
  data,
  setSelectedRows,
  reducer,
  dispatch,
  handleError,
) => {
  const idsToRemove = Object.keys(selectedRows);

  if (idsToRemove.length === 0) {
    handleError("No row selected.");
    return false;
  }

  if (idsToRemove.length === 1) {
    const onlyId = idsToRemove[0];
    const indexToRemove = data.findIndex((row) => row.id === onlyId);

    const nextItem =
      data[indexToRemove + 1] &&
      !idsToRemove.includes(String(data[indexToRemove + 1].id))
        ? data[indexToRemove + 1]
        : data[indexToRemove - 1] &&
            !idsToRemove.includes(String(data[indexToRemove - 1].id))
          ? data[indexToRemove - 1]
          : null;

    dispatch(reducer(idsToRemove));
    setSelectedRows(nextItem ? { [nextItem.id]: true } : {});
  } else {
    dispatch(reducer(idsToRemove));
    setSelectedRows({});
  }

  return true;
};
