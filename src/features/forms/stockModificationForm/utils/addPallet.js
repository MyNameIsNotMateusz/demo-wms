import { v4 as uuidv4 } from "uuid";

export const addPallet = (e, dispatch, addPalletRow) => {
  e.preventDefault();

  const uniqueId = uuidv4();

  const newRow = {
    client: "",
    project: "",
    pallet_id: "",
    material_code: "",
    status: "OK",
    quantity: 0,
    unique_id: uniqueId,
  };

  dispatch(addPalletRow(newRow));
};
