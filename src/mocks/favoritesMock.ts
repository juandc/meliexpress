import type { FavoritesApiData } from "@/types";

export const favoritesMock: FavoritesApiData = {
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
      favorite: true,
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
      favorite: true,
    },
  ],
};
