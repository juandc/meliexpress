import type { ItemApi } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function getItem(id: string): Promise<ItemApi> {
  const res = await fetch(apiEndpoints.item(id), {
    cache: 'no-store',
  });
  const searchData = await res.json();
  return searchData;
}
