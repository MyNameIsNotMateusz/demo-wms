export const getSelectedItem = ({
  selected,
  collection,
  keyName,
  errorMessage,
  handleError,
}) => {
  if (!selected || Object.keys(selected).length === 0) {
    handleError(errorMessage);
    return null;
  }

  const selectedKey = Object.keys(selected)[0];

  const item = collection.find((el) => el[keyName] === selectedKey);

  if (!item) {
    handleError(`${errorMessage.replace("select", "find")}`);
    return null;
  }

  return item;
};
