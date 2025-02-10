import type { FavoritesApi } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function getFavoriteItems(): Promise<FavoritesApi> {
  const res = await fetch(apiEndpoints.favorites, {
    cache: 'no-store',
  });
  const favoritesData = await res.json();
  return favoritesData;
}
