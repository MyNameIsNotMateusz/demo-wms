import { buildCoilLabelsData } from "./buildCoilLabelsData";

describe("buildCoilLabelsData", () => {
  it("should return an empty array when no coils are selected.", () => {
    const result = buildCoilLabelsData({}, []);

    expect(result).toEqual([]);
  });

  it("should return formatted label data for selected coils.", () => {
    const selectedCoils = { ABC1: true };
    const printedCoils = [
      {
        coil_id: "ABC1",
        material_code: "Material1",
        metal_type: "Coil",
        batch: "",
        width: 200,
        thickness: 2.4,
        weight: "1.600",
        unit: "kg",
      },
    ];

    const result = buildCoilLabelsData(selectedCoils, printedCoils);

    expect(result).toEqual([
      {
        coil_id: "ABC1",
        material_code: "Material1",
        metal_type: "Coil",
        batch: "",
        width: 200,
        thickness: 2.4,
        weight: 1.6,
        unit: "kg",
        printed_date: null,
      },
    ]);
  });
});
