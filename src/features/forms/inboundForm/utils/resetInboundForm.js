export const resetInboundForm = ({ dispatch, reducer, setFormData }) => {
  dispatch(reducer());

  setFormData({
    inbound_type: "",
    contractor_tax_id: "",
    date: "",
    operator_name: "",
    delivery_reference_number: "",
    remarks: "",
  });
};
