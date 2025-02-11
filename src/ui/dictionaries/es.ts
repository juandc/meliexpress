import { Dictionary } from "@/types";

const esDictionary: Dictionary = {
  meta: {
    default: {
      title: "MeliExpress: una versión lite de Mercado Libre",
      description: "Encuentra todos los productos que necesitas y guárdalos como favoritos.",
    },
    favorites: {
      title: "Tus favoritos | MeliExpress",
    },
    search: {
      title: (query: string) => `Resultados de ${query} | MeliExpress`,
    },
    item: {
      title: (title: string) => `${title} | MeliExpress`,
    },
  },
  navbar: {
    homeLinkTitle: "Página principal",
    placeholders: [
      "Buscar productos...",
      "¡Encuentra lo que necesitas!",
      "Explora nuestras categorías...",
      "¡Descubre ofertas increíbles!",
      "Nunca dejes de buscar",
    ],
    favoritesLinkTitle: "Página de favoritos",
  },
  shared: {
    addToFavorites: {
      btnCopy: {
        iddle: "Agregar a favoritos",
        saving: "Guardando...",
        removing: "Eliminando...",
        saved: "Eliminar de favoritos",
        error: "Error, intentar de nuevo",
      },
      linkToFavorites: "Ver favoritos",
    },
  },
};

export default esDictionary;
