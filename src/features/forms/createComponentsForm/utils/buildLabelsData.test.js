import { buildLabelsData } from "./buildLabelsData";

describe("buildLabelsData", () => {
  it("should return objects containing only id, material-code, quantity, and sequenceNumber, and quantity must be of type number.", () => {
    const items = [
      {
        pallet_id: "123",
        quantity: "2.000",
        material_seq_num: "22",
      },
      {
        pallet_id: "ABC12",
        quantity: "2.000",
        material_seq_number: "20",
      },
    ];
    const materialCode = "22_B318";

    const result = buildLabelsData(items, materialCode);

    expect(result).toEqual([
      {
        id: "123",
        material_code: "22_B318",
        quantity: 2,
        sequenceNumber: "22",
      },
      {
        id: "ABC12",
        material_code: "22_B318",
        quantity: 2,
        sequenceNumber: "20",
      },
    ]);
  });
});
