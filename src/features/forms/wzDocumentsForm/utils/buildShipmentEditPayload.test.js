import { buildShipmentEditPayload } from "./buildShipmentEditPayload";

describe("buildShipmentEditPayload", () => {
  it("should create pallets for deletion, updating, and addition.", () => {
    const originalPallets = [
      {
        pallet: "107FG",
        quantity: 1,
      },
      {
        pallet: "433",
        quantity: 5,
      },
      {
        pallet: "210FG",
        quantity: 46,
      },
    ];

    const currentPallets = [
      {
        id: "123",
        pallet: "433FG",
        quantity: 11,
      },
      {
        pallet: "107FG",
        quantity: 1,
      },
      {
        pallet: "433",
        quantity: 11,
      },
    ];

    const result = buildShipmentEditPayload({
      originalPallets,
      currentPallets,
    });

    expect(result).toEqual({
      items_to_delete: [
        {
          stock_id: "210FG",
        },
      ],
      items_to_update: [
        {
          stock_id: "433",
          quantity: "11.000",
        },
      ],
      items_to_add: [
        {
          stock_id: "433FG",
        },
      ],
    });
  });
});
