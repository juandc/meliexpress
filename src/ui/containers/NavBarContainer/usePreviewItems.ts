import { useState } from "react";
import type { BaseItem } from "@/types";
import { getSearchResults } from "@/ui/services/getSearchResults";

type PreviewItems = Record<string, BaseItem[]>;

export const usePreviewItems = (q: string) => {
  const [requestedItems, setRequestedItems] = useState<PreviewItems>({});

  const getPreviewItems = async () => {
    if (!q) return;
    if (requestedItems[q]) return;
    // TODO: api should allow different limits to avoid slicing in front
    const { data } = await getSearchResults(q);
    setRequestedItems(prev => ({ ...prev, [q]: data?.items?.slice?.(0, 2) }));
  };

  const previewItems = requestedItems[q] || [];

  return {
    previewItems,
    getPreviewItems,
  };
};
