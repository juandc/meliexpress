import type { ItemApiData } from "@/types";

export const itemMock: ItemApiData = {
  categories: ["Category 1", "Category 2"],
  item: {
    id: "1",
    title: "Item 1",
    price: {
      currency: "ARS",
      amount: 1000,
      decimals: 0,
    },
    picture: "https://via.placeholder.com/200x200",
    condition: "new",
    free_shipping: true,
    sold_quantity: 0,
    description: "Description 1",
    favorite: false,
  },
};
