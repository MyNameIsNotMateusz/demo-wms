import { validateEditedPallets } from "./validateEditedPallets";

describe("validateEditedPallets", () => {
  it("should return false when the quantity differs from the original quantity.", () => {
    const selectedIds = ["206_23540-NX4E1_20260718_00063"];
    const editedPallets = [
      {
        id: "206_23540-NX4E1_20260718_00063",
        quantity: 6,
        status: "OK",
        originalQuantity: "5.000",
        originalStatus: "OK",
      },
      {
        id: "1_23110-G4000SU_20260711_00041",
        quantity: "30.000",
        status: "OK",
        originalQuantity: "30.000",
        originalStatus: "OK",
      },
    ];

    const result = validateEditedPallets(selectedIds, editedPallets);

    expect(result).toBe(false);
  });

  it("should return false when the status differs from the original status", () => {
    const selectedIds = ["1_23110-G4000SU_20260711_00041"];
    const editedPallets = [
      {
        id: "206_23540-NX4E1_20260718_00063",
        quantity: "5.000",
        status: "OK",
        originalQuantity: "5.000",
        originalStatus: "OK",
      },
      {
        id: "1_23110-G4000SU_20260711_00041",
        quantity: "30.000",
        status: "HOLD",
        originalQuantity: "30.000",
        originalStatus: "OK",
      },
    ];

    const result = validateEditedPallets(selectedIds, editedPallets);

    expect(result).toBe(false);
  });

  it("should return true when all selected pallets are unchanged.", () => {
    const selectedIds = [
      "1_23110-G4000SU_20260711_00041",
      "206_23540-NX4E1_20260718_00063",
    ];
    const editedPallets = [
      {
        id: "206_23540-NX4E1_20260718_00063",
        quantity: "5.000",
        status: "OK",
        originalQuantity: "5.000",
        originalStatus: "OK",
      },
      {
        id: "1_23110-G4000SU_20260711_00041",
        quantity: "30.000",
        status: "OK",
        originalQuantity: "30.000",
        originalStatus: "OK",
      },
    ];

    const result = validateEditedPallets(selectedIds, editedPallets);

    expect(result).toBe(true);
  });
});
