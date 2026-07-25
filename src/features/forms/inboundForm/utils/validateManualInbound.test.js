import { validateManualInbound } from "./validateManualInbound";

describe("validateManualInbound", () => {
  it("should return false when the contractor is missing.", () => {
    const formData = {
      contractor_tax_id: "",
      operator_name: "Name",
    };

    const manualPallets = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 3,
      },
      {
        name: "PNL-RR BACK, LH (Sub Assy)",
        quantity: 5,
      },
    ];

    const result = validateManualInbound({
      formData,
      manualPallets,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the operator name is missing. ", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "",
    };

    const manualPallets = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 3,
      },
      {
        name: "PNL-RR BACK, LH (Sub Assy)",
        quantity: 5,
      },
    ];

    const result = validateManualInbound({
      formData,
      manualPallets,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when no pallets have been added.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const manualPallets = [];

    const result = validateManualInbound({
      formData,
      manualPallets,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when less than or equal to 0.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const manualPallets = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 3,
      },
      {
        name: "",
        quantity: 5,
      },
    ];

    const result = validateManualInbound({
      formData,
      manualPallets,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when a pallet quantity is less than or equal to 0.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const manualPallets = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 0,
      },
      {
        name: "PNL-RR BACK, LH (Sub Assy)",
        quantity: -2,
      },
    ];

    const result = validateManualInbound({
      formData,
      manualPallets,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when all inbound data are valid.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const manualPallets = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 3,
      },
      {
        name: "PNL-RR BACK, LH (Sub Assy)",
        quantity: 5,
      },
    ];

    const result = validateManualInbound({
      formData,
      manualPallets,
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
