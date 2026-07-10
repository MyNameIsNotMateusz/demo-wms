import { lookupMaterial } from "../../../../utils/table/lookupMaterial";

export const fetchMaterialData = async ({
  key,
  value,
  id,
  accessToken,
  dispatch,
  reducer,
}) => {
  const emptyData = {
    id,
    name: "",
    type: "",
    unit: "",
    material_code: "",
    seq_number: "",
  };

  if (!value) {
    dispatch(reducer(emptyData));
    return false;
  }

  try {
    const data = await lookupMaterial(key, value, accessToken);

    if (!data) {
      dispatch(reducer(emptyData));
      return false;
    }

    dispatch(
      reducer({
        id,
        name: data.name,
        type: data.type,
        unit: data.unit,
        material_code: data.code,
        seq_number: data.seq_number,
      }),
    );

    return true;
  } catch {
    dispatch(reducer(emptyData));
    return false;
  }
};
