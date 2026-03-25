import plannedDeliveryIcon from "../assets/icons/plannedDeliveryIcon.png";
import createComponentsIcon from "../assets/icons/createComponentsIcon.png";

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
      sections: [],
    },
  ],
};
