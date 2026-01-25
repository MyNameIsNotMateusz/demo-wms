import palletCreatorIcon from "../assets/icons/palletCreatorIcon.png";

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
              text: "Pallet Creator",
              code: "pallet_creator",
              icon: palletCreatorIcon,
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
