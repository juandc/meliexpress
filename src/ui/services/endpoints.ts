export const apiEndpoints = {
  search: (q: string) => `/api/items/?q=${q}`,
  item: (id: string) => `/api/items/${id}`,
  favorites: `/api/favorites/get`,
  saveFavorite: `/api/favorites/add`,
  deleteFavorite: (id: string) => `/api/favorites/${id}`,
};
