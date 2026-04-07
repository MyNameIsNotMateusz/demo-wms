export const validateContractorForm = (
  contractorFormData,
  projects,
  handleError,
) => {
  const { tax_id, name, address, country, contractor_type, regon, legal_form } =
    contractorFormData;

  if (!tax_id || !name || !address || !country || !contractor_type) {
    handleError("Please fill all required fields.");
    return false;
  }

  if (regon) {
    if (regon.length < 9 || regon.length > 14) {
      handleError("REGON must have between 9 and 14 characters.");
      return false;
    }
  }

  if (contractor_type === "COMPANY" && legal_form == undefined) {
    handleError(
      "For a contractor of type COMPANY, the legal form must be specified.",
    );
    return false;
  }

  if (projects.length > 0) {
    const hasEmptyProjectCode = projects.some((p) => !p.project_code);

    if (hasEmptyProjectCode) {
      handleError("Not all projects have selected Project Code.");
      return false;
    }

    const codes = projects.map((p) => p.project_code);
    const hasDuplicates = new Set(codes).size !== codes.length;

    if (hasDuplicates) {
      handleError("Project Code cannot be duplicated.");
      return false;
    }
  }

  return true;
};
