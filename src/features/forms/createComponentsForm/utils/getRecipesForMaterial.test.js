import { getRecipesForMaterial } from "./getRecipesForMaterial";

describe("getRecipesForMaterial", () => {
  it("should return recipes for the selected material.", () => {
    const projects = [
      {
        name: "SX2e/SZ1e/QVE Frame",
        code: "SX2E/SZ1E/QVE_FRAME",
        materials: [
          {
            material_code: "317FG_88335-HF000/CTE00",
            type: "FG",
            recipes: [
              {
                process: "SERVICE",
                inputs: [
                  {
                    material_code: "313BL_88334/337-HF000/CT00 AUTO",
                    type: "WIP",
                    quantity: 1,
                    alternative_group: null,
                  },
                ],
              },
            ],
          },
          {
            material_code: "402BL_88332-HF000/CT000_AUTO",
            type: "WIP",
            recipes: [],
          },
        ],
      },
    ];
    const projectName = "SX2e/SZ1e/QVE Frame";
    const materialCode = "317FG_88335-HF000/CTE00";

    const result = getRecipesForMaterial({
      projects,
      projectName,
      materialCode,
    });

    expect(result).toEqual([
      {
        process: "SERVICE",
        inputs: [
          {
            material_code: "313BL_88334/337-HF000/CT00 AUTO",
            type: "WIP",
            quantity: 1,
            alternative_group: null,
          },
        ],
      },
    ]);
  });
});
