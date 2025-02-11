export type AllowedDictionaries = "es";

export type Dictionary = {
  meta: {
    default: {
      title: string;
      description: string;
    };
    favorites: {
      title: string;
    };
    search: {
      title: (query: string) => string;
    };
    item: {
      title: (title: string) => string;
    };
  };
  navbar: {
    homeLinkTitle: string;
    placeholders: string[];
    favoritesLinkTitle: string;
  },
  shared: {
    addToFavorites: {
      btnCopy: {
        [key in "iddle" | "saving" | "removing" | "saved" | "error"]: string;
      };
      linkToFavorites: string;
    };
  };
};
