import type { FavoritesApi } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function getFavoriteItems(): Promise<FavoritesApi> {
  const res = await fetch(`http://localhost:3000${apiEndpoints.favorites}`);
  const favoritesData = await res.json();
  return favoritesData;
}
