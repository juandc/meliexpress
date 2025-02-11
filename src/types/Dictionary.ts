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
  shared: {
    navbar: {
      homeLinkTitle: string;
      placeholders: string[];
      favoritesLinkTitle: string;
    },
    addToFavorites: {
      btnCopy: {
        [key in "iddle" | "saving" | "removing" | "saved" | "error"]: string;
      };
      linkToFavorites: string;
    };
  };
  home: {
    title: string;
  };
  favorites: {
    title: string;
    empty: string;
  };
  search: {
    notFound: string;
  },
  item: {
    notFound: string;
  },
};
