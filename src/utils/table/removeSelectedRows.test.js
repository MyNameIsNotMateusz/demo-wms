import { handleRemoveSelectedRows } from "./removeSelectedRows";

describe("handleRemoveSelectedRows", () => {
  it("should return false when no item is selected.", () => {
    const noop = () => {};

    const result = handleRemoveSelectedRows({}, [], noop, noop, noop, noop);

    expect(result).toBe(false);
  });

  it("should select the next row when one row is removed.", () => {
    const noop = () => {};

    const selectedRows = {
      ABC123: true,
    };

    const data = [
      {
        id: "ABC123",
      },
      {
        id: "CBA123",
      },
    ];

    const setSelectedRows = jest.fn();

    handleRemoveSelectedRows(
      selectedRows,
      data,
      setSelectedRows,
      noop,
      noop,
      noop,
    );

    expect(setSelectedRows).toHaveBeenCalledWith({
      CBA123: true,
    });
  });

  it("should select the previous row when there is no next row.", () => {
    const noop = () => {};

    const selectedRows = {
      CBA123: true,
    };

    const data = [
      {
        id: "ABC123",
      },
      {
        id: "CBA123",
      },
    ];

    const setSelectedRows = jest.fn();

    handleRemoveSelectedRows(
      selectedRows,
      data,
      setSelectedRows,
      noop,
      noop,
      noop,
    );

    expect(setSelectedRows).toHaveBeenCalledWith({
      ABC123: true,
    });
  });

  it("should clear the selection and return true when multiple rows are removed.", () => {
    const noop = () => {};

    const selectedRows = {
      ABC123: true,
      CBA: true,
    };

    const setSelectedRows = jest.fn();

    const result = handleRemoveSelectedRows(
      selectedRows,
      [],
      setSelectedRows,
      noop,
      noop,
      noop,
    );

    expect(result).toBe(true);
    expect(setSelectedRows).toHaveBeenCalledWith({});
  });
});
