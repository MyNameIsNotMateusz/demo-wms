import { fetchContractors } from "../../features/dictionaries/contractorsSlice";
import { fetchPlannedDeliveries } from "../../features/dictionaries/plannedDeliverySlice";
import { fetchRecipes } from "../../features/dictionaries/recipesSlice";

export const dictionaryThunks = {
  fetchContractors,
  fetchPlannedDeliveries,
  fetchRecipes,
};
