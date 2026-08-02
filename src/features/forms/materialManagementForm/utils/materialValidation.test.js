import { validateMaterialForm } from "./materialValidation";

describe("validateMaterialForm", () => {
  it("should return false if required fields are missing.", () => {
    const data = {
      code: "",
      seq_number: "105FG",
      name: "Name",
      type: "FG",
      unit: "pcs",
      destination: "Destination",
      is_simplified: false,
      scrap_per_unit_weight: "0.031",
      unit_weight: "5.000",
    };

    const result = validateMaterialForm(data, () => {});

    expect(result).toBe(false);
  });

  it("should return false when a coil does not have material type, thickness, and width.", () => {
    const data = {
      code: "105FG_Code",
      seq_number: "105FG",
      name: "Name",
      type: "COIL",
      unit: "pcs",
      destination: "Destination",
      metal_type: "Metal Type",
      thickness: "2.500",
      width: null,
    };

    const result = validateMaterialForm(data, () => {});

    expect(result).toBe(false);
  });

  it("should return false when FG or WIP do not have is_simplified, unit_weight, and scrap_per_unit_weight.", () => {
    const data = {
      code: "105FG_Code",
      seq_number: "105FG",
      name: "Name",
      type: "FG",
      unit: "pcs",
      destination: "Destination",
      is_simplified: null,
      scrap_per_unit_weight: "0.031",
      unit_weight: "5.000",
    };

    const result = validateMaterialForm(data, () => {});

    expect(result).toBe(false);
  });

  it("should return false when FG or WIP have unit_weight less than or equal to scrap_per_unit_weight.", () => {
    const data = {
      code: "105FG_Code",
      seq_number: "105FG",
      name: "Name",
      type: "FG",
      unit: "pcs",
      destination: "Destination",
      is_simplified: false,
      scrap_per_unit_weight: "5.000",
      unit_weight: "5.000",
    };

    const result = validateMaterialForm(data, () => {});

    expect(result).toBe(false);
  });

  it("should return true when the form is valid.", () => {
    const data = {
      code: "105FG_Code",
      seq_number: "105FG",
      name: "Name",
      type: "COIL",
      unit: "pcs",
      destination: "Destination",
      metal_type: "Metal Type",
      thickness: "2.500",
      width: "500.000",
    };

    const result = validateMaterialForm(data, () => {});

    expect(result).toBe(true);
  });
});
