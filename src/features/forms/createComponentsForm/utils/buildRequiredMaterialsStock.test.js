import { buildRequiredMaterialsStock } from "./buildRequiredMaterialsStock";

describe("buildRequiredMaterialsStock", () => {
  it("should return the material without options if there are no alternative materials.", () => {
    const inputs = [
      {
        material_code: "401BL_88331-HF000/CT000_AUTO",
        material_name: "UPR CROSS MEMBER-FR BACK",
        alternative_group: null,
        available_total: "2408.000",
      },
    ];
    const recipes = [
      {
        process: "INTERNAL_PRODUCTION",
        inputs: [
          {
            material_code: "401BL_88331-HF000/CT000_AUTO",
            type: "WIP",
            quantity: 1,
            alternative_group: null,
          },
        ],
      },
    ];

    const result = buildRequiredMaterialsStock({
      inputs,
      recipes,
    });

    expect(result).toEqual([
      {
        material_code: "401BL_88331-HF000/CT000_AUTO",
        quantity: 1,
        availableQuantity: 2408,
      },
    ]);
  });

  it("should ignore unavailable materials and select the material with the lowest positive stock.", () => {
    const inputs = [
      {
        material_code: "402BL_88332-HF000/CT000_AUTO",
        material_name: "LWR CROSS MEMBER-FR BACK",
        alternative_group: "1",
        available_total: "102.000",
      },
      {
        material_code: "403BL_88434/437-HF000/CT00 AUTO",
        material_name: "BACK SIDE MEM, RH",
        alternative_group: "1",
        available_total: "2.000",
      },
      {
        material_code: "403BL_88434/437-HF000/CT00 AUTOB",
        material_name: "BACK SIDE MEM, RH",
        alternative_group: "1",
        available_total: "0",
      },
    ];

    const recipes = [
      {
        process: "INTERNAL_PRODUCTION",
        inputs: [
          {
            material_code: "402BL_88332-HF000/CT000_AUTO",
            type: "WIP",
            quantity: 5,
            alternative_group: "1",
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTO",
            type: "WIP",
            quantity: 2,
            alternative_group: "1",
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTOB",
            type: "WIP",
            quantity: 2,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = buildRequiredMaterialsStock({
      inputs,
      recipes,
    });

    expect(result).toEqual([
      {
        material_code: "403BL_88434/437-HF000/CT00 AUTO",
        quantity: 2,
        availableQuantity: 2,
        options: [
          {
            material_code: "402BL_88332-HF000/CT000_AUTO",
            quantity: 5,
            availableQuantity: 102,
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTO",
            quantity: 2,
            availableQuantity: 2,
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTOB",
            quantity: 2,
            availableQuantity: 0,
          },
        ],
      },
    ]);
  });

  it("should select the first material when no alternative materials are available.", () => {
    const inputs = [
      {
        material_code: "402BL_88332-HF000/CT000_AUTO",
        material_name: "LWR CROSS MEMBER-FR BACK",
        alternative_group: "1",
        available_total: "0",
      },
      {
        material_code: "403BL_88434/437-HF000/CT00 AUTO",
        material_name: "BACK SIDE MEM, RH",
        alternative_group: "1",
        available_total: "0",
      },
      {
        material_code: "403BL_88434/437-HF000/CT00 AUTOB",
        material_name: "BACK SIDE MEM, RH",
        alternative_group: "1",
        available_total: "0",
      },
    ];

    const recipes = [
      {
        process: "INTERNAL_PRODUCTION",
        inputs: [
          {
            material_code: "402BL_88332-HF000/CT000_AUTO",
            type: "WIP",
            quantity: 5,
            alternative_group: "1",
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTO",
            type: "WIP",
            quantity: 2,
            alternative_group: "1",
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTOB",
            type: "WIP",
            quantity: 2,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = buildRequiredMaterialsStock({
      inputs,
      recipes,
    });

    expect(result).toEqual([
      {
        material_code: "402BL_88332-HF000/CT000_AUTO",
        quantity: 5,
        availableQuantity: 0,
        options: [
          {
            material_code: "402BL_88332-HF000/CT000_AUTO",
            quantity: 5,
            availableQuantity: 0,
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTO",
            quantity: 2,
            availableQuantity: 0,
          },
          {
            material_code: "403BL_88434/437-HF000/CT00 AUTOB",
            quantity: 2,
            availableQuantity: 0,
          },
        ],
      },
    ]);
  });
});
