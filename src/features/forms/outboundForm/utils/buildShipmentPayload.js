export const buildShipmentPayload = ({ formData, selectedPallets }) => {
  const pallet_ids = selectedPallets.map((pallet) => pallet.pallet_id);

  return {
    contractor_tax_id: formData.contractor_tax_id,
    outbound_type: formData.outbound_type,
    pallet_ids,
    operator_name: formData.operator_name,
    remarks: formData.remarks,
    customer_order_number: formData.customer_order_number || null,
    service_request_number: formData.service_request_number || null,
    external_reference_number: null,
  };
};
