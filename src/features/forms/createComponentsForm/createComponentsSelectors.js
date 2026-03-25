import { createSelector } from "@reduxjs/toolkit";

const getRecipes = (state) => state.recipes.recipes;

export const selectProjects = createSelector([getRecipes], (recipes) => {
  if (!recipes?.clients) return [];

  return recipes.clients.flatMap((client) =>
    Array.isArray(client.projects) ? client.projects : [],
  );
});
