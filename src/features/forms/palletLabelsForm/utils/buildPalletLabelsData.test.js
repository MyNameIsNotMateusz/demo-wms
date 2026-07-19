import { buildPalletLabelsData } from "./buildPalletLabelsData";

describe("buildPalletLabelsData", () => {
  it("should return an empty array when no pallets are selected", () => {
    const result = buildPalletLabelsData({}, [{}]);

    expect(result).toEqual([]);
  });

  it("should return formatted label data for selected pallets", () => {
    const selectedPallets = { ABC: true };
    const pallets = [
      {
        pallet_id: "ABC",
        material_code: "Code",
        material_seq_number: "Seq",
        quantity: "5.000",
      },
    ];

    const result = buildPalletLabelsData(selectedPallets, pallets);

    expect(result).toEqual([
      {
        id: "ABC",
        material_code: "Code",
        sequenceNumber: "Seq",
        quantity: 5,
      },
    ]);
  });
});
