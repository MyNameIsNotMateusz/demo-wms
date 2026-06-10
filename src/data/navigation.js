import plannedDeliveryIcon from "../assets/icons/plannedDeliveryIcon.png";
import createComponentsIcon from "../assets/icons/createComponentsIcon.png";
import userManagementIcon from "../assets/icons/usersManagement.png";
import contractorManagementIcon from "../assets/icons/contractorManagement.png";
import changePasswordIcon from "../assets/icons/changePasswordIcon.png";
import materialManagementIcon from "../assets/icons/materialManagement.png";
import projectManagementIcon from "../assets/icons/projectManagement.png";
import recipesManagerIcon from "../assets/icons/recipesManagerIcon.png";
import wzDocumentsIcon from "../assets/icons/wzDocumentsIcon.png";
import stockModificationIcon from "../assets/icons/stockModificationIcon.png";
import palletLabelsIcon from "../assets/icons/palletLabelsIcon.png";
import coilManagerIcon from "../assets/icons/coilManagerIcon.png";
import coilLabelsIcon from "../assets/icons/coilLabelsIcon.png";
import outboundIcon from "../assets/icons/outboundIcon.png";
import inboundIcon from "../assets/icons/inboundIcon.png";

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
            {
              text: "Stock Modification",
              code: "inventory_change",
              icon: stockModificationIcon,
            },
            {
              text: "Pallet Labels",
              code: "print_label",
              icon: palletLabelsIcon,
            },
          ],
        },
        {
          title: "Coil Management",
          items: [
            {
              text: "Coil Manager",
              code: "coil_manager",
              icon: coilManagerIcon,
            },
            {
              text: "Coil Labels",
              code: "coil_label_printer",
              icon: coilLabelsIcon,
            },
          ],
        },
        {
          title: "Logistics Operations",
          items: [
            {
              text: "Outbound",
              code: "outbound",
              icon: outboundIcon,
            },
            {
              text: "Planned Delivery",
              code: "planned_delivery",
              icon: plannedDeliveryIcon,
            },
            {
              text: "Inbound",
              code: "inbound",
              icon: inboundIcon,
            },
          ],
        },
        {
          title: "Documents",
          items: [
            {
              text: "Outbound Delivery Note",
              code: "outbound_delivery_note",
              icon: wzDocumentsIcon,
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
            {
              text: "Project Management",
              code: "project_management",
              icon: projectManagementIcon,
            },
          ],
        },
        {
          title: "Material Management",
          items: [
            {
              text: "Recipes Manager",
              code: "recipes_manager",
              icon: recipesManagerIcon,
            },
          ],
        },
      ],
    },
  ],
};
