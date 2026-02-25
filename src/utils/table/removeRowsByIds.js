export const removeRowsByIds = (idsToRemove, setter, idKey = "id") => {
  setter((prev) => prev.filter((item) => !idsToRemove.includes(item[idKey])));
};
