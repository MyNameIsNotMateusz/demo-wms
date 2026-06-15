export const resetReturnCoilState = ({
  setReturnModalData,
  setSelectedProductionCoils,
  setSelectedConsumedCoils,
}) => {
  setReturnModalData({
    coil_id: "",
    weight: "",
    returned_weight: "",
    operator_name: "",
    remarks: "",
  });

  setSelectedProductionCoils({});
  setSelectedConsumedCoils({});
};
