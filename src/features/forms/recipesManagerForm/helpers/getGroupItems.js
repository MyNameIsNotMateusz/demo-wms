export const getGroupItems = (
  recipeMaterials,
  selectedProcess,
  groupNumber,
) => {
  const process = recipeMaterials.find((p) => p.process === selectedProcess);

  if (!process) return [];

  return process.inputs.filter(
    (input) => Number(input.alternative_group) === groupNumber,
  );
};
