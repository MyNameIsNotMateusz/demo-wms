export const handleFilterChange = (index, value, reducer, dispatch) => {
  dispatch(reducer({ index, value }));
};
