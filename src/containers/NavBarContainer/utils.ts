"use client";

export const getQueryFromUrl = () => {
  if (typeof window !== "undefined") {
    const href = window.location.href;
    const actualPath = window.location.pathname;
    if (actualPath.includes("/search/")) {
      return actualPath.replace("/search/", "");
    }
    if (actualPath.includes("/items")) {
      const url = new URL(href);
      return url.searchParams.get("q") || "";
    }
  }
  return "";
};
