import { fetchContractors } from "../../features/dictionaries/contractorsSlice";
import { fetchPlannedDeliveries } from "../../features/dictionaries/plannedDeliveriesSlice";
import { fetchRecipes } from "../../features/dictionaries/recipesSlice";
import { fetchProjects } from "../../features/dictionaries/projectsSlice";
import { fetchMaterials } from "../../features/dictionaries/materialsSlice";

export const dictionaryThunks = {
  fetchContractors,
  fetchPlannedDeliveries,
  fetchRecipes,
  fetchProjects,
  fetchMaterials
};
