import { validateOutboundForm } from "./validateOutboundForm";

describe("validateOutboundForm", () => {
  it("should return false when no pallets are selected.", () => {
    const formData = {
      outbound_type: "SHIPMENT_CUSTOMER",
      operator_name: "Operator",
      customer_order_number: "Customer Order Number",
    };

    const result = validateOutboundForm({
      selectedPallets: [],
      formData,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the outbound type is shipment to customer and the operator name or customer order number is missing.", () => {
    const formData = {
      outbound_type: "SHIPMENT_CUSTOMER",
      operator_name: "Operator",
      customer_order_number: "",
    };

    const result = validateOutboundForm({
      selectedPallets: [{}],
      formData,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the outbound type is shipment to service and the operator name or service request number is missing.", () => {
    const formData = {
      outbound_type: "SHIPMENT_SERVICE",
      operator_name: "",
      service_request_number: "Service Request Number",
    };

    const result = validateOutboundForm({
      selectedPallets: [{}],
      formData,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the outbound type is other and the operator name is missing.", () => {
    const formData = {
      outbound_type: "OTHER",
      operator_name: "",
    };

    const result = validateOutboundForm({
      selectedPallets: [{}],
      formData,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when the form data is valid.", () => {
    const formData = {
      outbound_type: "SHIPMENT_CUSTOMER",
      operator_name: "Operator",
      customer_order_number: "Customer Order Number",
    };

    const result = validateOutboundForm({
      selectedPallets: [{}],
      formData,
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
