export const resetOutboundForm = ({ dispatch, clearState, setFormData }) => {
  dispatch(clearState());

  setFormData({
    outbound_type: "",
    date: "",
    contractor_tax_id: "",
    operator_name: "",
    remarks: "",
    customer_order_number: "",
    service_request_number: "",
  });
};
