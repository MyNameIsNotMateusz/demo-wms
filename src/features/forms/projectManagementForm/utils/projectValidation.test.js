import { validateProjectForm } from "./projectValidation";

describe("validateProjectForm", () => {
  it("should return false when one of the required fields is missing.", () => {
    const projectFormData = {
      code: "Code",
      name: "Name",
      type: "SALES",
      start_date: "",
    };
    const materialsTable = [];

    const result = validateProjectForm(
      projectFormData,
      materialsTable,
      () => {},
    );

    expect(result).toBe(false);
  });

  it("should return false when the end date is earlier than the start date.", () => {
    const projectFormData = {
      code: "Code",
      name: "Name",
      type: "SALES",
      start_date: "2015-12-31",
      end_date: "2015-12-30",
    };
    const materialsTable = [];

    const result = validateProjectForm(
      projectFormData,
      materialsTable,
      () => {},
    );

    expect(result).toBe(false);
  });

  it("should return false when a material has no material type and material code selected.", () => {
    const projectFormData = {
      code: "Code",
      name: "Name",
      type: "SALES",
      start_date: "2015-12-31",
    };
    const materialsTable = [
      {
        material_code: "Code01",
        type: "FG",
      },
      {
        material_code: "Code02",
        type: "",
      },
    ];

    const result = validateProjectForm(
      projectFormData,
      materialsTable,
      () => {},
    );

    expect(result).toBe(false);
  });

  it("should return false when materials have duplicates.", () => {
    const projectFormData = {
      code: "Code",
      name: "Name",
      type: "SALES",
      start_date: "2015-12-31",
    };
    const materialsTable = [
      {
        material_code: "Code01",
        type: "FG",
      },
      {
        material_code: "Code01",
        type: "FG",
      },
    ];

    const result = validateProjectForm(
      projectFormData,
      materialsTable,
      () => {},
    );

    expect(result).toBe(false);
  });

  it("should return true when the form is valid.", () => {
    const projectFormData = {
      code: "Code",
      name: "Name",
      type: "SALES",
      start_date: "2015-12-31",
    };
    const materialsTable = [];

    const result = validateProjectForm(
      projectFormData,
      materialsTable,
      () => {},
    );

    expect(result).toBe(true);
  });
});
