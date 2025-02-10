import { API_URL } from "@/env";

export const apiEndpoints = {
  search: (q: string) => `${API_URL}/items/?q=${q}`,
  item: (id: string) => `${API_URL}/items/${id}`,
  favorites: `${API_URL}/favorites/get`,
  saveFavorite: `${API_URL}/favorites/add`,
  deleteFavorite: (id: string) => `${API_URL}/favorites/${id}`,
};
