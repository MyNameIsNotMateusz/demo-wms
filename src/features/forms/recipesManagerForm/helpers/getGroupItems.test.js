import { getGroupItems } from "./getGroupItems";

describe("getGroupItems", () => {
  it("should return an empty array when the process is not found.", () => {
    const recipeMaterials = [
      {
        process: "INTERNAL_PRODUCTION",
        inputs: [
          {
            material_code: "M1",
            alternative_group: "1",
          },
          {
            material_code: "M2",
            alternative_group: "1",
          },
        ],
      },
    ];
    const selectedProcess = "SERVICE";
    const groupNumber = 1;

    const result = getGroupItems(recipeMaterials, selectedProcess, groupNumber);

    expect(result).toEqual([]);
  });

  it("should return all materials from the selected alternative group.", () => {
    const recipeMaterials = [
      {
        process: "INTERNAL_PRODUCTION",
        inputs: [
          {
            material_code: "M1",
            alternative_group: "1",
          },
          {
            material_code: "M2",
            alternative_group: "1",
          },
          {
            material_code: "M3",
            alternative_group: "2",
          },
        ],
      },
    ];
    const selectedProcess = "INTERNAL_PRODUCTION";
    const groupNumber = 1;

    const result = getGroupItems(recipeMaterials, selectedProcess, groupNumber);

    expect(result).toEqual([
      {
        material_code: "M1",
        alternative_group: "1",
      },
      {
        material_code: "M2",
        alternative_group: "1",
      },
    ]);
  });
});
