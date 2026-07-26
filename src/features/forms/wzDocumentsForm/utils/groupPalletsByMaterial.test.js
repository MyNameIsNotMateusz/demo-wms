import { groupPalletsByMaterial } from "./groupPalletsByMaterial";

describe("groupPalletsByMaterial", () => {
  it("should group pallets by their material code", () => {
    const pallets = [
      {
        material_code: "107FG",
        material_name: "BRK'T",
        quantity: 2,
      },
      {
        material_code: "107FG",
        material_name: "BRK'T",
        quantity: 67,
      },
      {
        material_code: "433FG",
        material_name: "BEAM",
        quantity: 11,
      },
    ];

    const result = groupPalletsByMaterial(pallets);

    expect(result).toEqual([
      {
        material_code: "107FG",
        material_name: "BRK'T",
        quantity: 69,
      },
      {
        material_code: "433FG",
        material_name: "BEAM",
        quantity: 11,
      },
    ]);
  });
});
