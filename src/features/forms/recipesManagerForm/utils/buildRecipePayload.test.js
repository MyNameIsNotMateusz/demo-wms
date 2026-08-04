import { buildRecipePayload } from "./buildRecipePayload";

describe("buildRecipePayload", () => {
  it("should return an empty inputs array when the process was not found.", () => {
    const formData = {
      output_material_code: "Code12",
      process_type: "SERVICE",
    };

    const recipeMaterials = [
      {
        process: "INTERNAL_PRODUCTION",
        inputs: [
          {
            material_code: "Code123",
            quantity: 5,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = buildRecipePayload({ formData, recipeMaterials });

    expect(result).toEqual({
      output_material_code: "Code12",
      process_type: "SERVICE",
      output_qty: "1.000",
      items: [],
    });
  });

  it("should build the correct payload with materials.", () => {
    const formData = {
      output_material_code: "Code12",
      process_type: "SERVICE",
    };

    const recipeMaterials = [
      {
        process: "SERVICE",
        inputs: [
          {
            material_code: "Code123",
            quantity: 5,
            alternative_group: "1",
          },
          {
            material_code: "Code1234",
            quantity: 2,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = buildRecipePayload({ formData, recipeMaterials });

    expect(result).toEqual({
      output_material_code: "Code12",
      process_type: "SERVICE",
      output_qty: "1.000",
      items: [
        {
          input_material_code: "Code123",
          quantity: "5.0",
          alternative_group: "1",
        },
        {
          input_material_code: "Code1234",
          quantity: "2.0",
          alternative_group: "1",
        },
      ],
    });
  });
});
