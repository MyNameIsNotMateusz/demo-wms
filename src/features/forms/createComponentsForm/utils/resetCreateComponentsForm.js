import { clearProductionData } from "../createComponentsFormSlice";

export const resetCreateComponentsForm = ({
  dispatch,
  setFormData,
  setRecipes,
  setMaterialCodes,
  setPreviewSrc,
  setSelectedCreatedPallets,
}) => {
  setRecipes([]);

  setFormData({
    seqNumber: "",
    project: "",
    material_code: "",
    operator_name: "",
    production_order_number: "",
    remarks: "",
    coil: "",
  });

  setMaterialCodes([]);

  setPreviewSrc(null);

  setSelectedCreatedPallets({});

  dispatch(clearProductionData());
};
