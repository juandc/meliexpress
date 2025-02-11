import { MELI_API_URL } from "@/env";

export const externalEndpoints = {
  meli: {
    search: (q: string) => `${MELI_API_URL}/sites/MLA/search?q=${q}&limit=5`,
    item: (id: string) => `${MELI_API_URL}/items/${id}`,
    description: (id: string) => `${MELI_API_URL}/items/${id}/description`,
    categories: (id: string) => `${MELI_API_URL}/categories/${id}`,
  },
};
