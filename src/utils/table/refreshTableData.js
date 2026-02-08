export const refreshTableData = (dispatch, refreshThunk, accessToken) => {
  dispatch(refreshThunk(accessToken));
};
