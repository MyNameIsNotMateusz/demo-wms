import { removeRecipeMaterial } from "../recipesManagerFormSlice";

export const handleRemoveMaterial = ({
  selectedMaterials,
  data,
  dispatch,
  selectedProcess,
  setSelectedMaterials,
  setHasChanges,
}) => {
  const selectedKeys = Object.keys(selectedMaterials);

  if (selectedKeys.length === 0) return;

  const id = selectedKeys[0];

  dispatch(
    removeRecipeMaterial({
      ids: selectedKeys,
      selectedProcess,
    }),
  );
  setHasChanges(true);

  if (selectedKeys.length === 1) {
    const indexToRemove = data.findIndex((item) => item.material_code === id);

    const nextItem = data[indexToRemove + 1] || data[indexToRemove - 1];

    if (nextItem) {
      setSelectedMaterials({ [nextItem.material_code]: true });
      return;
    }
  }

  setSelectedMaterials({});
};
