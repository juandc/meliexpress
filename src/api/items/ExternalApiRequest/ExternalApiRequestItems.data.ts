export class ExternalApiRequestItemsData {
  public static async originalSearchResults(q: string) {
    const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=5`);
    const data = await res.json();
    return data;
  }

  public static async originalItem(id: string) {
    const [data, dataDesc] = await Promise.all([
      fetch(`https://api.mercadolibre.com/items/${id}`).then(res => res.json()),
      fetch(`https://api.mercadolibre.com/items/${id}/description`).then(res => res.json()),
    ]);
    const dataCategory = await fetch(`https://api.mercadolibre.com/categories/${data.category_id}`).then(res => res.json());
    return { data, dataDesc, dataCategory };
  }
}
