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
  shared: {
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
  home: {
    title: "¡Bienvenido!",
  },
  favorites: {
    empty: "Aquí aparecerán los items que guardes como favoritos",
    title: "Tus favoritos",
  },
  search: {
    notFound: "No se encontraron resultados para tu búsqueda, intenta de nuevo",
  },
  item: {
    notFound: "No se encontró el item que buscabas, intenta de nuevo",
  },
};

export default esDictionary;
