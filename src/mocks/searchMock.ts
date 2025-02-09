import type { SearchApiData } from "@/types";

export const searchMock: SearchApiData = {
  categories: ["Category 1", "Category 2"],
  items: [
    {
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
      address_state: "Buenos Aires",
      favorite: false,
    },
    {
      id: "2",
      title: "Item 2",
      price: {
        currency: "ARS",
        amount: 2000,
        decimals: 0,
      },
      picture: "https://via.placeholder.com/200x200",
      condition: "new",
      free_shipping: false,
      address_state: "Buenos Aires",
      favorite: false,
    },
    {
      id: "3",
      title: "Item 3",
      price: {
        currency: "ARS",
        amount: 3000,
        decimals: 0,
      },
      picture: "https://via.placeholder.com/200x200",
      condition: "new",
      free_shipping: true,
      address_state: "Buenos Aires",
      favorite: false,
    },
    {
      id: "4",
      title: "Item 4",
      price: {
        currency: "ARS",
        amount: 4000,
        decimals: 0,
      },
      picture: "https://via.placeholder.com/200x200",
      condition: "new",
      free_shipping: false,
      address_state: "Buenos Aires",
      favorite: false,
    },
    {
      id: "5",
      title: "Item 5",
      price: {
        currency: "ARS",
        amount: 5000,
        decimals: 0,
      },
      picture: "https://via.placeholder.com/200x200",
      condition: "new",
      free_shipping: true,
      address_state: "Buenos Aires",
      favorite: false,
    },
  ],
};
