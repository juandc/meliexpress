import type { SearchApi } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function getSearchResults(q: string): Promise<SearchApi> {
  // TODO: next caché, 1 min ?
  const res = await fetch(`http://localhost:3000${apiEndpoints.search(q)}`);
  const searchData = await res.json();
  return searchData;
}
