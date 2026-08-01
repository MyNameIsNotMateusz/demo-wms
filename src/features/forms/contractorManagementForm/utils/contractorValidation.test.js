import { validateContractorForm } from "./contractorValidation";

describe("validateContractorForm", () => {
  it("should return false when one of the required fields is missing.", () => {
    const contractorFormData = {
      regon: "111111111",
    };

    const result = validateContractorForm(contractorFormData, [], () => {});

    expect(result).toBe(false);
  });

  it("should return false when the REGON number has an incorrect format.", () => {
    const contractorFormData = {
      tax_id: "CZ000000000",
      name: "Name",
      regon: "11111111",
      address: "Address",
      country: "Country",
      legal_form: "sp z oo",
      contractor_type: "COMPANY",
    };

    const result = validateContractorForm(contractorFormData, [], () => {});

    expect(result).toBe(false);
  });

  it("should return false when contractor type is company and legal form is missing.", () => {
    const contractorFormData = {
      tax_id: "CZ000000000",
      name: "Name",
      regon: "111111111",
      address: "Address",
      country: "Country",
      legal_form: "",
      contractor_type: "COMPANY",
    };

    const result = validateContractorForm(contractorFormData, [], () => {});

    expect(result).toBe(false);
  });

  it("should return false when a project has no project code selected.", () => {
    const contractorFormData = {
      tax_id: "CZ000000000",
      name: "Name",
      regon: "111111111",
      address: "Address",
      country: "Country",
      legal_form: "sp z oo",
      contractor_type: "COMPANY",
    };
    const projects = [
      {
        project_code: "",
      },
    ];

    const result = validateContractorForm(
      contractorFormData,
      projects,
      () => {},
    );

    expect(result).toBe(false);
  });

  it("should return false when projects have duplicates.", () => {
    const contractorFormData = {
      tax_id: "CZ000000000",
      name: "Name",
      regon: "111111111",
      address: "Address",
      country: "Country",
      legal_form: "sp z oo",
      contractor_type: "COMPANY",
    };
    const projects = [
      {
        project_code: "123",
      },
      {
        project_code: "123",
      },
    ];

    const result = validateContractorForm(
      contractorFormData,
      projects,
      () => {},
    );

    expect(result).toBe(false);
  });

  it("should return true when the form is valid.", () => {
    const contractorFormData = {
      tax_id: "CZ000000000",
      name: "Name",
      regon: "111111111",
      address: "Address",
      country: "Country",
      legal_form: "sp z oo",
      contractor_type: "COMPANY",
    };

    const result = validateContractorForm(contractorFormData, [], () => {});

    expect(result).toBe(true);
  });
});
