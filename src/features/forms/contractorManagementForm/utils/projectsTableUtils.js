export const getNextSelectedProject = (displayedProjects, selectedKey) => {
  const getKey = (item) => item.rowId || item.project_code;

  const selectedIndex = displayedProjects.findIndex(
    (item) => getKey(item) === selectedKey,
  );

  const newDisplayed = [...displayedProjects];
  newDisplayed.splice(selectedIndex, 1);

  if (newDisplayed.length === 0) return null;

  const newIndex =
    selectedIndex >= newDisplayed.length
      ? newDisplayed.length - 1
      : selectedIndex;

  return getKey(newDisplayed[newIndex]);
};
