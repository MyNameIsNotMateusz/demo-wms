import { validatePlannedInbound } from "./validatePlannedInbound";

describe("validatePlannedInbound", () => {
  it("should return false when the delivery is not selected.", () => {
    const formData = {
      operator_name: "Name",
    };

    const selectedPlannedDeliveries = {};

    const deliveryItems = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 2,
        isNew: true,
      },
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 1,
      },
    ];

    const result = validatePlannedInbound({
      formData,
      selectedPlannedDeliveries,
      deliveryItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when the operator name is missing.", () => {
    const formData = {
      operator_name: " ",
    };

    const selectedPlannedDeliveries = {
      "123id": true,
    };

    const deliveryItems = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 2,
        isNew: true,
      },
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 1,
      },
    ];

    const result = validatePlannedInbound({
      formData,
      selectedPlannedDeliveries,
      deliveryItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when an item quantity is less than or equal to 0.", () => {
    const formData = {
      operator_name: "Name",
    };

    const selectedPlannedDeliveries = {
      "123id": true,
    };

    const deliveryItems = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 0,
        isNew: true,
      },
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: -1,
      },
    ];

    const result = validatePlannedInbound({
      formData,
      selectedPlannedDeliveries,
      deliveryItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return false when a new item has no material selected.", () => {
    const formData = {
      operator_name: "Name",
    };

    const selectedPlannedDeliveries = {
      "123id": true,
    };

    const deliveryItems = [
      {
        name: "",
        quantity: 2,
        isNew: true,
      },
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 1,
      },
    ];

    const result = validatePlannedInbound({
      formData,
      selectedPlannedDeliveries,
      deliveryItems,
      handleError: () => {},
    });

    expect(result).toBe(false);
  });

  it("should return true when all inbound data are valid.", () => {
    const formData = {
      operator_name: "Name",
    };

    const selectedPlannedDeliveries = {
      "123id": true,
    };

    const deliveryItems = [
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 2,
        isNew: true,
      },
      {
        name: "PNL-RR BACK FRAME RH SU",
        quantity: 1,
      },
    ];

    const result = validatePlannedInbound({
      formData,
      selectedPlannedDeliveries,
      deliveryItems,
      handleError: () => {},
    });

    expect(result).toBe(true);
  });
});
