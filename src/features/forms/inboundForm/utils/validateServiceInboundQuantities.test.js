import { validateServiceInboundQuantities } from "./validateServiceInboundQuantities";

describe("validateServiceInboundQuantities", () => {
  it("should return false when the requested quantity exceeds the available quantity.", () => {
    const pallets = [
      {
        quantity: "246.000",
        material_code: "210_2C1D0-NQ5E0",
        material_unit: "pcs",
      },
    ];

    const consumption = {
      "210_2C1D0-NQ5E0": 430,
    };

    const result = validateServiceInboundQuantities({
      pallets,
      consumption,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when the requested quantity does not exceed the available quantity.", () => {
    const pallets = [
      {
        quantity: "246.000",
        material_code: "210_2C1D0-NQ5E0",
        material_unit: "pcs",
      },
    ];

    const consumption = {
      "210_2C1D0-NQ5E0": 246,
    };

    const result = validateServiceInboundQuantities({
      pallets,
      consumption,
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
