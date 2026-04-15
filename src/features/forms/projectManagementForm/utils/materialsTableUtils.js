export const getNextSelectedMaterial = (displayedMaterials, selectedKey) => {
  const getKey = (item) => item.rowId || item.material_code;

  const selectedIndex = displayedMaterials.findIndex(
    (item) => getKey(item) === selectedKey,
  );

  const newDisplayed = [...displayedMaterials];
  newDisplayed.splice(selectedIndex, 1);

  if (newDisplayed.length === 0) return null;

  const newIndex =
    selectedIndex >= newDisplayed.length
      ? newDisplayed.length - 1
      : selectedIndex;

  return getKey(newDisplayed[newIndex]);
};
