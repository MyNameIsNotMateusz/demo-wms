import { validateServiceInbound } from "./validateServiceInbound";

describe("validateServiceInbound", () => {
  it("should return false when the contractor is missing.", () => {
    const formData = {
      contractor_tax_id: "",
      operator_name: "Name",
    };

    const serviceItems = [
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 2,
      },
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 1,
      },
    ];

    const result = validateServiceInbound({
      formData,
      serviceItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the operator name is missing.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: " ",
    };

    const serviceItems = [
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 2,
      },
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 1,
      },
    ];

    const result = validateServiceInbound({
      formData,
      serviceItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when no pallets have been added.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const serviceItems = [];

    const result = validateServiceInbound({
      formData,
      serviceItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when a pallet has no material selected.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const serviceItems = [
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 2,
      },
      {
        name: "",
        quantity: 1,
      },
    ];

    const result = validateServiceInbound({
      formData,
      serviceItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when a pallet quantity is less than or equal to 0.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const serviceItems = [
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 2,
      },
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 0,
      },
    ];

    const result = validateServiceInbound({
      formData,
      serviceItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when all inbound data are valid.", () => {
    const formData = {
      contractor_tax_id: "000000000",
      operator_name: "Name",
    };

    const serviceItems = [
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 2,
      },
      {
        name: "LEG BRK'T CTR SUB ASS'Y_RH (REMOTE CABLE BRK'T)",
        quantity: 1,
      },
    ];

    const result = validateServiceInbound({
      formData,
      serviceItems,
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
