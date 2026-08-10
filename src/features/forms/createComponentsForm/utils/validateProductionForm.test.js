import { validateProductionForm } from "./validateProductionForm";

describe("validateProductionForm", () => {
  it("should return false when isAssemblyMode is null.", () => {
    const result = validateProductionForm({
      isAssemblyMode: null,
      createdPallets: [
        {
          quantity: 2,
        },
      ],
      formData: {
        type: "WIP",
        operator_name: "Operator",
      },
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the material type is neither WIP nor FG.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [
        {
          quantity: 2,
        },
      ],
      formData: {
        type: "COIL",
        operator_name: "Operator",
      },
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the createdPallets array is empty.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [],
      formData: {
        type: "WIP",
        operator_name: "Operator",
      },
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the operator name is empty.", () => {
    const result = validateProductionForm({
      isAssemblyMode: true,
      createdPallets: [
        {
          quantity: 2,
        },
      ],
      formData: {
        type: "WIP",
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
        type: "WIP",
        operator_name: "Operator",
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
        type: "FG",
        operator_name: "ABC",
      },
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
