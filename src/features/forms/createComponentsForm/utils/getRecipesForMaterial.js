export const getRecipesForMaterial = ({
  projects,
  projectName,
  materialCode,
}) => {
  const selectedProject = projects.find((p) => p.name === projectName);

  const selectedMaterial = selectedProject?.materials.find(
    (m) => m.material_code === materialCode,
  );

  return selectedMaterial ? selectedMaterial.recipes : [];
};
