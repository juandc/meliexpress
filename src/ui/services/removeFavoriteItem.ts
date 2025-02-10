import type { DetailedItem } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function removeFavoriteItem(id: DetailedItem["id"]): Promise<boolean> {
  const res = await fetch(apiEndpoints.deleteFavorite(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/JSON",
    },
    cache: 'no-store',
  });
  return res.ok;
}
