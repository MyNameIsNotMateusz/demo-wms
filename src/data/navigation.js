import plannedDeliveryIcon from "../assets/icons/plannedDeliveryIcon.png";
import createComponentsIcon from "../assets/icons/createComponentsIcon.png";
import userManagementIcon from "../assets/icons/usersManagement.png";
import contractorManagementIcon from "../assets/icons/contractorManagement.png";
import changePasswordIcon from "../assets/icons/changePasswordIcon.png";
import materialManagementIcon from "../assets/icons/materialManagement.png";

export const navItems = {
  tabs: [
    {
      label: "Warehouse",
      code: "warehouse",
      to: "/logisticsStock",
      sections: [
        {
          title: "Stock Operations",
          items: [
            {
              text: "Create Components",
              code: "create_components",
              icon: createComponentsIcon,
            },
          ],
        },
        {
          title: "Logistics Operations",
          items: [
            {
              text: "Planned Delivery",
              code: "planned_delivery",
              icon: plannedDeliveryIcon,
            },
          ],
        },
      ],
    },
    {
      label: "Settings",
      code: "settings",
      to: "/settings",
      sections: [
        {
          title: "System Settings",
          items: [
            {
              text: "User Management",
              code: "user_management",
              icon: userManagementIcon,
            },
            {
              text: "Contractor Management",
              code: "contractor_management",
              icon: contractorManagementIcon,
            },
            {
              text: "Change Password",
              code: "change_password",
              icon: changePasswordIcon,
            },
          ],
        },
        {
          title: "Warehouse Settings",
          items: [
            {
              text: "Material Management",
              code: "material_management",
              icon: materialManagementIcon,
            },
          ],
        },
      ],
    },
  ],
};
