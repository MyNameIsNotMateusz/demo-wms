import { buildPayload } from "./buildPayload";

describe("buildPayload", () => {
  it("should build the correct payload.", () => {
    const userName = "ABC";
    const remarks = "BCA";
    const removedPallets = [
      {
        id: "108FG_23160-G4000_20260718_00149",
      },
    ];
    const editedPallets = [
      {
        id: "323FG_89751-HF010_20260703_00070",
        quantity: "100.000",
        status: "OK",
      },
    ];
    const addedPallets = [
      {
        pallet_id: "",
        material_code: "206_23540-NX4E1",
        status: "OK",
        quantity: 5,
      },
    ];

    const result = buildPayload(
      userName,
      remarks,
      removedPallets,
      editedPallets,
      addedPallets,
    );

    expect(result).toEqual({
      operator_name: "ABC",
      remarks: "BCA",
      pallet_to_remove: ["108FG_23160-G4000_20260718_00149"],
      pallet_to_add: [
        {
          pallet_id: "",
          material_code: "206_23540-NX4E1",
          quantity: 5,
          status: "OK",
        },
      ],
      pallet_to_edit: [
        {
          pallet_id: "323FG_89751-HF010_20260703_00070",
          quantity: 100,
          status: "OK",
        },
      ],
    });
  });
});
