import { buildDeliveryDetailsRows } from "./buildDeliveryDetailsRows";

describe("buildDeliveryDetailsRows", () => {
  it("should return empty array when no pallets are selected.", () => {
    const selectedPlannedDeliveries = {};
    const displayedPlannedDeliveries = [
      {
        id: "123",
        items: [
          { material: { seq_number: "1" }, planned_quantity: "5.000" },
          { material: { seq_number: "2" }, planned_quantity: "10.000" },
        ],
      },
    ];

    const result = buildDeliveryDetailsRows(
      selectedPlannedDeliveries,
      displayedPlannedDeliveries,
    );

    expect(result).toEqual([]);
  });

  it("should return empty array when the selected pallet is not found in the displayed planned deliveries.", () => {
    const selectedPlannedDeliveries = {
      123: true,
    };
    const displayedPlannedDeliveries = [
      {
        id: "1234",
        items: [
          { material: { seq_number: "1" }, planned_quantity: "5.000" },
          { material: { seq_number: "2" }, planned_quantity: "10.000" },
        ],
      },
    ];

    const result = buildDeliveryDetailsRows(
      selectedPlannedDeliveries,
      displayedPlannedDeliveries,
    );

    expect(result).toEqual([]);
  });

  it("should return mapped delivery details for the selected planned delivery.", () => {
    const selectedPlannedDeliveries = {
      123: true,
    };
    const displayedPlannedDeliveries = [
      {
        id: "123",
        items: [
          {
            id: "999",
            material: {
              seq_number: "1",
              material_code: "MAT01",
              name: "Steel Sheet",
              type: "WIP",
              unit: "pcs",
            },
            planned_quantity: "5.000",
          },
          {
            id: "111",
            material: {
              seq_number: "2",
              material_code: "MAT02",
              name: "Steel Coil",
              type: "FG",
              unit: "kg",
            },
            planned_quantity: "10.000",
          },
        ],
      },
    ];

    const result = buildDeliveryDetailsRows(
      selectedPlannedDeliveries,
      displayedPlannedDeliveries,
    );

    expect(result).toEqual([
      {
        id: "999",
        seq_number: "1",
        material_code: "MAT01",
        name: "Steel Sheet",
        type: "WIP",
        planned_quantity: 5,
        unit: "pcs",
      },
      {
        id: "111",
        seq_number: "2",
        material_code: "MAT02",
        name: "Steel Coil",
        type: "FG",
        planned_quantity: 10,
        unit: "kg",
      },
    ]);
  });
});
