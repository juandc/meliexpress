import type { DetailedItem } from "@/types";

export class FavoritesService {
  private static _favoriteItems: Record<DetailedItem["id"], DetailedItem> = {};

  private static _getAll(): DetailedItem[] {
    return Object.values(this._favoriteItems);
  }

  public static getAll(): DetailedItem[] {
    return this._getAll();
  }

  private static _getById(id: DetailedItem["id"]): DetailedItem | undefined {
    const item = this._favoriteItems[id];
    return item;
  }

  public static getById(id: DetailedItem["id"]): DetailedItem {
    const item = this._getById(id);
    if (!item) {
      throw new Error(`No item with id ${id} in favorites`);
    }
    return item;
  }

  public static save(item: DetailedItem): void {
    if (this._getById(item.id)) {
      throw new Error(`Item with id ${item.id} already exists in favorites`);
    }
    this._favoriteItems[item.id] = item;
  }

  public static delete(id: DetailedItem["id"]): void {
    if (!this._getById(id)) {
      throw new Error(`Item with id ${id} does not exists in favorites`);
    }
    delete this._favoriteItems[id];
  }
}
