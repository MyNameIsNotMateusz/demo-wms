import { toggleAccessUtil, toggleAllChildrenUtil } from "./accessUtils";

describe("toggleAccessUtil", () => {
  it("should remove the category if it has no access.", () => {
    const prev = {
      warehouse: {
        outbound: true,
      },
    };
    const code = "outbound";
    const category = "warehouse";

    const result = toggleAccessUtil(prev, code, category);

    expect(result).toEqual({});
  });

  it("should update the existing category after changing access.", () => {
    const prev = {
      warehouse: {
        outbound: true,
        print_label: true,
      },
    };
    const code = "outbound";
    const category = "warehouse";

    const result = toggleAccessUtil(prev, code, category);

    expect(result).toEqual({
      warehouse: {
        print_label: true,
      },
    });
  });

  it("should add the first access to a new category.", () => {
    const prev = {};
    const code = "outbound";
    const category = "warehouse";

    const result = toggleAccessUtil(prev, code, category);

    expect(result).toEqual({
      warehouse: {
        outbound: true,
      },
    });
  });

  it("should add another access to the existing category.", () => {
    const prev = {
      warehouse: {
        print_label: true,
      },
    };
    const code = "outbound";
    const category = "warehouse";

    const result = toggleAccessUtil(prev, code, category);

    expect(result).toEqual({
      warehouse: {
        print_label: true,
        outbound: true,
      },
    });
  });
});

describe("toggleAllChildrenUtil", () => {
  it("should return the previous state if the category does not exist in access tabs.", () => {
    const prev = {
      warehouse: {
        print_label: true,
      },
      settings: {
        user_management: true,
      },
      quality: {
        pallet_quality: true,
      },
    };
    const category = "hr";
    const isChecked = true;
    const accessTabs = [
      {
        code: "warehouse",
        children: [
          {
            code: "print_label",
          },
        ],
      },
      {
        code: "settings",
        children: [
          {
            code: "user_management",
          },
        ],
      },
      {
        code: "quality",
        children: [
          {
            code: "pallet_quality",
          },
        ],
      },
    ];

    const result = toggleAllChildrenUtil(prev, category, isChecked, accessTabs);

    expect(result).toEqual({
      warehouse: {
        print_label: true,
      },
      settings: {
        user_management: true,
      },
      quality: {
        pallet_quality: true,
      },
    });
  });

  it("should remove the category if it was selected.", () => {
    const prev = {
      warehouse: {
        print_label: true,
      },
    };
    const category = "warehouse";
    const isChecked = true;
    const accessTabs = [
      {
        code: "warehouse",
        children: [
          {
            code: "print_label",
          },
        ],
      },
    ];

    const result = toggleAllChildrenUtil(prev, category, isChecked, accessTabs);

    expect(result).toEqual({});
  });

  it("should add a new category with all its accesses when it was not selected.", () => {
    const prev = {};
    const category = "warehouse";
    const isChecked = undefined;
    const accessTabs = [
      {
        code: "warehouse",
        children: [
          {
            code: "print_label",
          },
        ],
      },
    ];

    const result = toggleAllChildrenUtil(prev, category, isChecked, accessTabs);

    expect(result).toEqual({
      warehouse: {
        print_label: true,
      },
    });
  });
});
