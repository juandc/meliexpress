/* eslint-disable @typescript-eslint/no-explicit-any */

export class ExternalApiRequestItemsData {
  private static _getItemsCategoryIds(originalItems: any) {
    const categories: string[] = originalItems.map((c: any) => c.category_id) ?? [];
    return categories;
  }

  private static _mostResultsCategory(originalCategories: string[]) {
    const categoriesResults: Record<string, number> = {};

    const addOrCreateCategoryResultsCount = (category: string) => {
      categoriesResults[category] = (categoriesResults[category] || 0) + 1;
    };
    originalCategories.forEach(addOrCreateCategoryResultsCount);

    const getBiggerKey = (a: string, b: string) => {
      return categoriesResults[a] > categoriesResults[b] ? a : b;
    };
    const biggerKey = Object.keys(categoriesResults).reduce(getBiggerKey);

    return biggerKey;
  }

  public static async originalSearchResults(q: string) {
    const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=5`);
    const data = await res.json();

    const categories = this._getItemsCategoryIds(data.results);
    const mostResultsCategory = this._mostResultsCategory(categories);
    const dataCategory = await fetch(`https://api.mercadolibre.com/categories/${mostResultsCategory}`).then(res => res.json());

    return {
      ...data,
      categories: dataCategory,
    };
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
