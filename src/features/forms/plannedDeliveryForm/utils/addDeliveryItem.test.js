import { addDeliveryItem } from "./addDeliveryItem";

describe("addDeliveryItem", () => {
  it("should return null when contractor is not selected", () => {
    const formData = {
      contractor_tax_id: "",
    };
    const noop = () => {};
    const result = addDeliveryItem(formData, noop, noop, noop, noop);

    expect(result).toBe(null);
  });
});
