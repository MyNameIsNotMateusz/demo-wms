export const handleFocus = (key, value, setter, id) => {
  setter((prev) => {
    if (id) {
      const prevRow = prev[id] || {};
      return {
        ...prev,
        [id]: { ...prevRow, [key]: value },
      };
    } else {
      return {
        ...prev,
        [key]: value,
      };
    }
  });
};

export const handleChange = (key, value, setter, id) => {
  setter((prev) => {
    if (id) {
      const prevRow = prev[id] || {};
      return {
        ...prev,
        [id]: { ...prevRow, [key]: value },
      };
    } else {
      return {
        ...prev,
        [key]: value,
      };
    }
  });
};

export const handleBlur = (
  setter,
  idKey,
  id,
  key,
  value,
  setEditedValues,
  type = "string",
) => {
  let finalValue = value;

  if (type === "number") {
    if (value === "" || Number(value) < 0) {
      finalValue = 0;
    } else {
      finalValue = Number(value);
    }
  }

  setter((prev) =>
    prev.map((item) =>
      item[idKey] === id ? { ...item, [key]: finalValue } : item,
    ),
  );

  setEditedValues({});
};
