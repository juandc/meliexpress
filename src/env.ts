export const MELI_API_URL = process.env.MELI_API_URL ?? "https://api.mercadolibre.com";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");
