import { addDeliveryRow } from "./addDeliveryRow";

describe("addDeliveryRow", () => {
  it("should return false when no delivery is selected", () => {
    const noop = () => {};
    const result = addDeliveryRow({}, noop, noop, noop, noop);

    expect(result).toBe(false);
  });
});
