import { validateRecipe } from "./validateRecipe";

describe("validateRecipe", () => {
  it("should return an error message when the process is not selected.", () => {
    const formData = {
      output_material_code: "Code123",
      process_type: "",
    };
    const materials = [
      {
        material_code: "Code123",
        type: "FG",
        recipes: [
          {
            process: "SERVICE",
            inputs: [
              {
                material_code: "WIP12",
                type: "WIP",
                quantity: 5,
                alternative_group: "1",
              },
            ],
          },
        ],
      },
    ];
    const recipeMaterials = [
      {
        process: "SERVICE",
        inputs: [
          {
            material_code: "WIP12",
            type: "WIP",
            quantity: 5,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = validateRecipe({ formData, materials, recipeMaterials });

    expect(result).toBe("Please select a process before submitting.");
  });

  it("should return an error message when the output product is not either WIP or FG.", () => {
    const formData = {
      output_material_code: "Code123",
      process_type: "SERVICE",
    };
    const materials = [
      {
        material_code: "Code123",
        type: "COIL",
        recipes: [
          {
            process: "SERVICE",
            inputs: [
              {
                material_code: "WIP12",
                type: "WIP",
                quantity: 5,
                alternative_group: "1",
              },
            ],
          },
        ],
      },
    ];
    const recipeMaterials = [
      {
        process: "SERVICE",
        inputs: [
          {
            material_code: "WIP12",
            type: "WIP",
            quantity: 5,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = validateRecipe({ formData, materials, recipeMaterials });

    expect(result).toBe(
      "The output product must be either WIP (work in progress) or FG (finished good).",
    );
  });

  it("should return an error message when the recipe is empty.", () => {
    const formData = {
      output_material_code: "Code123",
      process_type: "SERVICE",
    };
    const materials = [
      {
        material_code: "Code123",
        type: "FG",
        recipes: [
          {
            process: "SERVICE",
            inputs: [
              {
                material_code: "WIP12",
                type: "WIP",
                quantity: 5,
                alternative_group: "1",
              },
            ],
          },
        ],
      },
    ];
    const recipeMaterials = [
      {
        process: "SERVICE",
        inputs: [],
      },
    ];

    const result = validateRecipe({ formData, materials, recipeMaterials });

    expect(result).toBe("No input materials selected for the recipe.");
  });

  it("should return an error when the quantity in the recipe is less than or equal to 0.", () => {
    const formData = {
      output_material_code: "Code123",
      process_type: "SERVICE",
    };
    const materials = [
      {
        material_code: "Code123",
        type: "FG",
        recipes: [
          {
            process: "SERVICE",
            inputs: [
              {
                material_code: "WIP12",
                type: "WIP",
                quantity: 5,
                alternative_group: "1",
              },
            ],
          },
        ],
      },
    ];
    const recipeMaterials = [
      {
        process: "SERVICE",
        inputs: [
          {
            material_code: "WIP12",
            type: "WIP",
            quantity: 0,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = validateRecipe({ formData, materials, recipeMaterials });

    expect(result).toBe(
      "All input materials must have quantity greater than 0.",
    );
  });

  it("should return null when the form is valid.", () => {
    const formData = {
      output_material_code: "Code123",
      process_type: "SERVICE",
    };
    const materials = [
      {
        material_code: "Code123",
        type: "FG",
        recipes: [
          {
            process: "SERVICE",
            inputs: [
              {
                material_code: "WIP12",
                type: "WIP",
                quantity: 5,
                alternative_group: "1",
              },
              {
                material_code: "WIP123",
                type: "WIP",
                quantity: 2,
                alternative_group: "1",
              },
            ],
          },
        ],
      },
    ];
    const recipeMaterials = [
      {
        process: "SERVICE",
        inputs: [
          {
            material_code: "WIP12",
            type: "WIP",
            quantity: 5,
            alternative_group: "1",
          },
          {
            material_code: "WIP123",
            type: "WIP",
            quantity: 5,
            alternative_group: "1",
          },
        ],
      },
    ];

    const result = validateRecipe({ formData, materials, recipeMaterials });

    expect(result).toBe(null);
  });
});
