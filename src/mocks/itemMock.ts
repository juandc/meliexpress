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
    picture: "https://http2.mlstatic.com/D_Q_NP_2X_789308-MLC48132800800_112021-AB.webp",
    condition: "new",
    free_shipping: true,
    sold_quantity: 0,
    description: "Description 1",
    address_state: "Buenos Aires",
    favorite: false,
  },
};
