import { buildShipmentPayload } from "./buildShipmentPayload";

describe("buildShipmentPayload", () => {
  it("should create pallet_ids array from selected pallets.", () => {
    const formData = {};
    const selectedPallets = [
      {
        pallet_id: "123",
      },
      {
        pallet_id: "321",
      },
    ];

    const result = buildShipmentPayload({
      formData,
      selectedPallets,
    });

    expect(result.pallet_ids).toEqual(["123", "321"]);
  });

  it("should create a valid shipment payload.", () => {
    const formData = {
      outbound_type: "SHIPMENT_CUSTOMER",
      date: "Date",
      contractor_tax_id: "999999999",
      operator_name: "Name",
      remarks: "Remarks",
      customer_order_number: "Customer Order Number",
      service_request_number: "Service Request Number",
    };
    const selectedPallets = [
      {
        pallet_id: "123",
      },
      {
        pallet_id: "321",
      },
    ];

    const result = buildShipmentPayload({
      formData,
      selectedPallets,
    });

    expect(result).toEqual({
      contractor_tax_id: "999999999",
      outbound_type: "SHIPMENT_CUSTOMER",
      pallet_ids: ["123", "321"],
      operator_name: "Name",
      remarks: "Remarks",
      customer_order_number: "Customer Order Number",
      service_request_number: "Service Request Number",
      external_reference_number: null,
    });
  });
});
