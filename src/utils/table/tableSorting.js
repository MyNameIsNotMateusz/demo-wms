export const toggleSort = (columnIndex, reducer, dispatch) => {
  dispatch(reducer(columnIndex));
};
