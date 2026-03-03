export const handleMaterialLookup = async (
  id,
  key,
  value,
  dispatch,
  reducer,
  lookupMaterial,
  accessToken,
) => {
  const emptyRow = {
    id,
    name: "",
    type: "",
    unit: "",
    material_code: key === "seq_number" ? "" : undefined,
    seq_number: key === "material_code" ? "" : undefined,
  };

  if (!value) {
    dispatch(reducer(emptyRow));
    return false;
  }

  try {
    const responseData = await lookupMaterial(key, value, accessToken);

    if (!responseData || !responseData.name) {
      dispatch(reducer(emptyRow));
      return false;
    }

    dispatch(
      reducer({
        id,
        name: responseData.name,
        type: responseData.type,
        unit: responseData.unit,
        material_code: responseData.code,
        seq_number: responseData.seq_number,
      }),
    );

    return true;
  } catch (error) {
    dispatch(reducer(emptyRow));
    return false;
  }
};
