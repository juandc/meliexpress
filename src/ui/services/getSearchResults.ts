import type { SearchApi } from "@/types";
import { apiEndpoints } from "./endpoints";

export async function getSearchResults(q: string): Promise<SearchApi> {
  const res = await fetch(apiEndpoints.search(q), {
    cache: 'no-store',
  });
  const searchData = await res.json();
  return searchData;
}
