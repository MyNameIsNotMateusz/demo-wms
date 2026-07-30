export const handleRemoveSelectedRows = (
  selectedRows,
  data,
  setSelectedRows,
  reducer,
  dispatch,
  handleError,
  getRowId = (row) => row.id,
) => {
  const idsToRemove = Object.keys(selectedRows);

  if (idsToRemove.length === 0) {
    handleError("No row selected.");
    return false;
  }

  if (idsToRemove.length === 1) {
    const onlyId = idsToRemove[0];

    const indexToRemove = data.findIndex(
      (row) => String(getRowId(row)) === onlyId,
    );

    const nextItem =
      data[indexToRemove + 1] &&
      !idsToRemove.includes(String(getRowId(data[indexToRemove + 1])))
        ? data[indexToRemove + 1]
        : data[indexToRemove - 1] &&
            !idsToRemove.includes(String(getRowId(data[indexToRemove - 1])))
          ? data[indexToRemove - 1]
          : null;

    dispatch(reducer(idsToRemove));
    setSelectedRows(nextItem ? { [getRowId(nextItem)]: true } : {});
  } else {
    dispatch(reducer(idsToRemove));
    setSelectedRows({});
  }

  return true;
};
