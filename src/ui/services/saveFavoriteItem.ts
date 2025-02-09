import type { BaseItem } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function saveFavoriteItem(item: BaseItem): Promise<boolean> {
  const res = await fetch(`http://localhost:3000${apiEndpoints.saveFavorite}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item }),
  });
  return res.ok;
}
