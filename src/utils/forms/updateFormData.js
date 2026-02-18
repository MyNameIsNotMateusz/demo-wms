export const updateFormData = (setter, key, value) => {
  setter((prev) => ({ ...prev, [key]: value }));
};
