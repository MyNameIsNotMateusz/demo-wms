import { getSelectedItem } from "./getSelectedItem";

describe("getSelectedItem", () => {
  it("should return null when no element is selected.", () => {
    const selected = {};

    const collection = [
      {
        email: "admin@admin.pl",
      },
      {
        email: "user@user.pl",
      },
    ];

    const keyName = "email";

    const result = getSelectedItem({
      selected,
      collection,
      keyName,
      errorMessage: "message",
      handleError: () => {},
    });

    expect(result).toBe(null);
  });

  it("should return null when an element is not found in the collection.", () => {
    const selected = {
      "admin@admin.pl": true,
    };

    const collection = [
      {
        email: "admin2@admin.pl",
      },
      {
        email: "user@user.pl",
      },
    ];

    const keyName = "email";

    const result = getSelectedItem({
      selected,
      collection,
      keyName,
      errorMessage: "message",
      handleError: () => {},
    });

    expect(result).toBe(null);
  });

  it("should return the selected element.", () => {
    const selected = {
      "admin@admin.pl": true,
    };

    const collection = [
      {
        email: "admin@admin.pl",
      },
      {
        email: "user@user.pl",
      },
    ];

    const keyName = "email";

    const result = getSelectedItem({
      selected,
      collection,
      keyName,
      errorMessage: "message",
      handleError: () => {},
    });

    expect(result).toEqual({
      email: "admin@admin.pl",
    });
  });
});
