import {
  PlannedDeliveryForm,
  CreateComponentsForm,
  UserManagementForm,
  ContractorManagementForm,
  ChangePasswordForm,
  MaterialManagementForm,
} from "../features/forms";

export const formRegistry = {
  planned_delivery: PlannedDeliveryForm,
  create_components: CreateComponentsForm,
  user_management: UserManagementForm,
  contractor_management: ContractorManagementForm,
  change_password: ChangePasswordForm,
  material_management: MaterialManagementForm,
};
