import { DetailedItem } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function removeFavoriteItem(id: DetailedItem["id"]): Promise<boolean> {
  const url = `http://localhost:3000${apiEndpoints.deleteFavorite(id)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/JSON",
    },
  });
  return res.ok;
}
