import { v4 as uuidv4 } from "uuid";
import { addManualPallet, updateManualPallet } from "../inboundFormSlice";
import { fetchMaterialData } from "../api/fetchMaterialData";

export const addSelectedMaterials = async ({
  selectedMaterials,
  accessToken,
  dispatch,
}) => {
  const selectedIds = Object.keys(selectedMaterials);

  for (const materialCode of selectedIds) {
    const id = uuidv4();

    dispatch(
      addManualPallet({
        id,
        seq_number: "",
        material_code: "",
        name: "",
        type: "",
        quantity: 0,
        unit: "",
      }),
    );

    await fetchMaterialData({
      key: "material_code",
      value: materialCode,
      id,
      accessToken,
      dispatch,
      reducer: updateManualPallet,
    });
  }
};
