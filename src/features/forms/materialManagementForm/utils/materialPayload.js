export const prepareMaterialPayload = (data, mode) => {
  const payload = { ...data };

  if (mode === "edit") {
    delete payload.created_at;
    delete payload.updated_at;
    delete payload.graphic_uml;
  }

  return payload;
};
