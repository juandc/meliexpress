import { useState } from "react";
import { useDebounce } from "@/ui/hooks/useDebounce";
import { getQueryFromUrl } from "./utils";

export const useDebouncedQuery = (delay: number) => {
  const [query, setQuery] = useState(getQueryFromUrl);
  const realQuery = query.trim();
  const debouncedQuery = useDebounce(realQuery, delay);
  const realDebouncedQuery = debouncedQuery.trim();

  return {
    query: realQuery,
    debouncedQuery: realDebouncedQuery,
    setQuery,
  };
};
