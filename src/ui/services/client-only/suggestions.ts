const KEY = "suggestions";

export const getLsSuggestions = async (query: string = "") => {
  if (typeof window === "undefined") {
    throw new Error("This function is client-only");
  }
  // Just to simulate real-world behavior
  await new Promise((resolve) => setTimeout(resolve, 100));
  const storedSuggestions = window.localStorage.getItem(KEY);
  if (!storedSuggestions) return [];
  const strSuggestions = storedSuggestions.split(", ");
  const filteredSuggestions = query.length
    ? strSuggestions.filter((sug) => sug.includes(query.trim()) && sug.trim() !== query.trim())
    : strSuggestions;
  const len = filteredSuggestions.length;
  const lastSuggestions = len > 3
    ? filteredSuggestions.slice(0, 3)
    : filteredSuggestions;
  return lastSuggestions;
};

export const saveLsSuggestions = async (suggestion: string) => {
  if (typeof window === "undefined") {
    throw new Error("This function is client-only");
  }
  // Just to simulate real-world behavior
  await new Promise((resolve) => setTimeout(resolve, 100));
  const newSuggestion = suggestion.toLowerCase().trim();
  const storedSuggestions = localStorage.getItem(KEY);
  if (!storedSuggestions) {
    window.localStorage.setItem(KEY, newSuggestion);
    return;
  }
  const oldSuggestions = storedSuggestions.split(", ");
  if (oldSuggestions.includes(newSuggestion)) return;
  const newSuggestions = [newSuggestion, ...oldSuggestions];
  if (newSuggestions.length > 30) {
    newSuggestions.pop();
  }
  const strSuggestions = newSuggestions.join(", ");
  window.localStorage.setItem(KEY, strSuggestions);
};
