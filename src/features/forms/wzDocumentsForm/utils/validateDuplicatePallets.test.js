import { validateDuplicatePallets } from "./validateDuplicatePallets";

describe("validateDuplicatePallets", () => {
  it("should return false when the same pallet is added more than once.", () => {
    const items_to_add = [
      {
        stock_id: "210FG_2C1D0-NQ5E0_20260725_00195",
      },
      {
        stock_id: "210FG_2C1D0-NQ5E0_20260725_00195",
      },
    ];

    const result = validateDuplicatePallets(items_to_add);

    expect(result).toBe(false);
  });

  it("should return true when every pallet is unique.", () => {
    const items_to_add = [
      {
        stock_id: "23_24540-NX4E0_20260530_00087",
      },
      {
        stock_id: "213_23431-NX4E1_20260725_00086",
      },
    ];

    const result = validateDuplicatePallets(items_to_add);

    expect(result).toBe(true);
  });
});
