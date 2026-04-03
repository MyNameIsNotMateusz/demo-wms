import { fetchContractors } from "../../features/dictionaries/contractorsSlice";
import { fetchPlannedDeliveries } from "../../features/dictionaries/plannedDeliverySlice";
import { fetchRecipes } from "../../features/dictionaries/recipesSlice";
import { fetchProjects } from "../../features/dictionaries/projectsSlice";

export const dictionaryThunks = {
  fetchContractors,
  fetchPlannedDeliveries,
  fetchRecipes,
  fetchProjects,
};
