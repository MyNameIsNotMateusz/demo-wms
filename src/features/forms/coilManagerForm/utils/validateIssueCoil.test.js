import { validateIssueCoil } from "./validateIssueCoil";

describe("validateIssueCoil", () => {
  it("should return false when the coil is not found.", () => {
    const formData = {
      coil_id: "123",
      operator_name: "Operator",
      material_code: "",
    };

    const result = validateIssueCoil({
      formData,
      productionCoils: [],
      consumedCoils: [],
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the operator name is missing.", () => {
    const formData = {
      coil_id: "123",
      operator_name: "",
      material_code: "ABC",
    };

    const result = validateIssueCoil({
      formData,
      productionCoils: [],
      consumedCoils: [],
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the coil is already in production.", () => {
    const formData = {
      coil_id: "123",
      operator_name: "Operator",
      material_code: "ABC",
    };
    const productionCoils = [
      {
        coil_id: "123",
      },
    ];

    const result = validateIssueCoil({
      formData,
      productionCoils,
      consumedCoils: [],
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the coil has already been consumed.", () => {
    const formData = {
      coil_id: "123",
      operator_name: "Operator",
      material_code: "ABC",
    };
    const consumedCoils = [
      {
        coil_id: "123",
      },
    ];

    const result = validateIssueCoil({
      formData,
      productionCoils: [],
      consumedCoils,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when the coil can be issued.", () => {
    const formData = {
      coil_id: "123",
      operator_name: "Operator",
      material_code: "ABC",
    };

    const result = validateIssueCoil({
      formData,
      productionCoils: [],
      consumedCoils: [],
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
