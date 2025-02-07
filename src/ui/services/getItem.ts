import type { ItemApi } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function getItem(id: string): Promise<ItemApi> {
  // TODO: next caché, 1 min ?
  const res = await fetch(`http://localhost:3000${apiEndpoints.item(id)}`);
  const searchData = await res.json();
  return searchData;
}
