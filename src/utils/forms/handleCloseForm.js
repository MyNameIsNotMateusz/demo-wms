export const handleCloseForm = ({
  setFormData,
  setIsFormVisible,
  setMode,
  initialState = {},
}) => {
  setFormData(initialState);
  setIsFormVisible(false);
  setMode(null);
};
