export const findCoilById = (coilId, productionCoils, consumedCoils) => {
  return (
    productionCoils.find((coil) => coil.coil_id === coilId) ||
    consumedCoils.find((coil) => coil.coil_id === coilId)
  );
};
