import { calculateServiceConsumption } from "./calculateServiceConsumption";

describe("calculateServiceConsumption", () => {
  it("should calculate material consumption based on service items and recipes", () => {
    const serviceItems = [
      {
        material_code: "433FG_865Y2-EV000",
        quantity: 11,
      },
      {
        material_code: "433_865Y1-EV000SU",
        quantity: 5,
      },
    ];

    const recipes = [
      {
        output_material: {
          code: "433FG_865Y2-EV000",
        },
        output_qty: 1,
        items: [
          {
            material: {
              code: "433_865Y1-EV000SU",
            },
            required_quantity: 1,
          },
        ],
      },
    ];

    const result = calculateServiceConsumption({
      serviceItems,
      recipes,
    });

    expect(result).toEqual({
      "433_865Y1-EV000SU": 16,
    });
  });
});
