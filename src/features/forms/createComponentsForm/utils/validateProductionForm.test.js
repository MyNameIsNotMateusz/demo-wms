import { validateProductionForm } from "./validateProductionForm";

describe("validateProductionForm", () => {
  it("should return false when isAssembly is null.", () => {
    const result = validateProductionForm({
      isAssemblyMode: null,
      createdPallets: [],
      formData: {},
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the createdPallets array is empty.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [],
      formData: {},
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the operator name is empty.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [{}],
      formData: {
        operator_name: "",
      },
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when not all pallets have a quantity greater than 0.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [
        {
          quantity: 2,
        },
        {
          quantity: 0,
        },
      ],
      formData: {
        operator_name: "ABC",
      },
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when the form is valid.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [
        {
          quantity: 2,
        },
        {
          quantity: 2,
        },
      ],
      formData: {
        operator_name: "ABC",
      },
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
