export const toggleAccessUtil = (prev, code, category) => {
  const categoryObj = prev[category] ? { ...prev[category] } : {};

  if (categoryObj[code]) {
    delete categoryObj[code];
  } else {
    categoryObj[code] = true;
  }

  if (Object.keys(categoryObj).length === 0) {
    const newState = { ...prev };
    delete newState[category];
    return newState;
  }

  return { ...prev, [category]: categoryObj };
};

export const toggleAllChildrenUtil = (
  prev,
  category,
  isChecked,
  accessTabs,
) => {
  const tab = accessTabs.find((t) => t.code === category);
  if (!tab) return prev;

  const newState = { ...prev };

  if (isChecked) {
    delete newState[category];
  } else {
    newState[category] = {};
    tab.children.forEach((child) => {
      newState[category][child.code] = true;
    });
  }

  return newState;
};

export const selectAllAccessesUtil = (accessTabs) => {
  const allAccesses = {};

  accessTabs.forEach((tab) => {
    allAccesses[tab.code] = {};
    tab.children.forEach((child) => {
      allAccesses[tab.code][child.code] = true;
    });
  });

  return allAccesses;
};
