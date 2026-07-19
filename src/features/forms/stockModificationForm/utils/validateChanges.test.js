import { validateChanges } from "./validateChanges";

describe("validateChanges", () => {
  it("should return false when no changes were made.", () => {
    const result = validateChanges([], [], [], [], () => {});

    expect(result).toBe(false);
  });

  it("should return false when required fields are missing.", () => {
    const addedPallets = [
      {
        client: "Client",
        project: "Project",
        pallet_id: "",
        material_code: "",
        quantity: 2,
      },
    ];

    const result = validateChanges([], [], [], addedPallets, () => {});
    expect(result).toBe(false);
  });

  it("should return false when quantity is less than or equal to 0.", () => {
    const addedPallets = [
      {
        client: "ABC",
        project: "CBA",
        pallet_id: "",
        material_code: "BCA",
        quantity: 0,
      },
    ];

    const result = validateChanges([], [], [], addedPallets, () => {});

    expect(result).toBe(false);
  });

  it("should return false when duplicate pallet IDs are detected.", () => {
    const addedPallets = [
      {
        client: "ABC",
        project: "CBA",
        pallet_id: "aa",
        material_code: "BCA",
        quantity: 2,
      },
      {
        client: "BBB",
        project: "AAA",
        pallet_id: "AA",
        material_code: "CCC",
        quantity: 10,
      },
    ];

    const result = validateChanges([], [], [], addedPallets, () => {});

    expect(result).toBe(false);
  });

  it("should return false when a pallet ID already exists.", () => {
    const pallets = [
      {
        id: "ABC123",
      },
    ];

    const addedPallets = [
      {
        client: "ABC",
        project: "CBA",
        pallet_id: "abc123",
        material_code: "BCA",
        quantity: 2,
      },
    ];

    const result = validateChanges(pallets, [], [], addedPallets, () => {});

    expect(result).toBe(false);
  });

  it("should return true when all changes are valid.", () => {
    const pallets = [
      {
        id: "1234",
      },
    ];

    const addedPallets = [
      {
        client: "ABC",
        project: "CBA",
        pallet_id: "123",
        material_code: "BCA",
        quantity: 2,
      },
    ];

    const result = validateChanges(pallets, [], [], addedPallets, () => {});

    expect(result).toBe(true);
  });
});
