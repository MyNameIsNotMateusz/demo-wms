export const findProjectByCode = (projectsList, code) =>
  projectsList.find((project) => project.code === code);
