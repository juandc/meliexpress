// import type {  } from "@/types";
import { DetailedItem } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function saveFavoriteItem(item: DetailedItem): Promise<boolean> {
  const res = await fetch(`http://localhost:3000${apiEndpoints.saveFavorite}`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({ ...item }),
  });
  return res.ok;
}
