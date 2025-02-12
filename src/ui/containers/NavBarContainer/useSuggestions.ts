import { useState } from "react";
import { getLsSuggestions, saveLsSuggestions } from "@/ui/services/client-only/suggestions";

export const useSuggestions = (q: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = async () => {
    const storedSuggestions = await getLsSuggestions(q);
    setSuggestions(storedSuggestions);
  };

  const saveSuggestions = async (suggestion: string) => {
    await saveLsSuggestions(suggestion);
  };

  return {
    suggestions,
    getSuggestions,
    saveSuggestions,
  };
};
