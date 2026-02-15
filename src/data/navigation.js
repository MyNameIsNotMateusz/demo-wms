import plannedDeliveryIcon from "../assets/icons/plannedDeliveryIcon.png";

export const navItems = {
  tabs: [
    {
      label: "Warehouse",
      code: "warehouse",
      to: "/logisticsStock",
      sections: [
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
