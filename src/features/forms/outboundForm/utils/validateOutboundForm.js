export const validateOutboundForm = ({
  selectedPallets,
  formData,
  handleError,
}) => {
  if (selectedPallets.length === 0) {
    handleError("No pallet has been selected.");
    return false;
  }

  if (formData.outbound_type === "SHIPMENT_CUSTOMER") {
    if (!formData.operator_name || !formData.customer_order_number) {
      handleError("Please fill in all required fields.");

      return false;
    }
  }

  if (formData.outbound_type === "SHIPMENT_SERVICE") {
    if (!formData.operator_name || !formData.service_request_number) {
      handleError("Please fill in all required fields.");

      return false;
    }
  }

  if (formData.outbound_type === "OTHER") {
    if (!formData.operator_name) {
      handleError("Please fill in all required fields.");

      return false;
    }
  }

  return true;
};
