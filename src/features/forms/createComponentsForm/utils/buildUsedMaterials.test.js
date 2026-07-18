import { buildUsedMaterials } from "./buildUsedMaterials";

describe("buildUsedMaterials", () => {
  it("should build the payload for used materials correctly.", () => {
    const requiredMaterialsStock = [
      {
        material_code: "402BL_88332-HF000/CT000_AUTO",
        quantity: 5,
        availableQuantity: 49,
      },
      {
        material_code: "401BL_88331-HF000/CT000_AUTO",
        quantity: 1,
        availableQuantity: 2397,
      },
    ];

    const totalQuantity = 4;

    const result = buildUsedMaterials({
      requiredMaterialsStock,
      totalQuantity,
    });

    expect(result).toEqual([
      {
        material_code: "402BL_88332-HF000/CT000_AUTO",
        quantity: 20,
      },
      {
        material_code: "401BL_88331-HF000/CT000_AUTO",
        quantity: 4,
      },
    ]);
  });
});
