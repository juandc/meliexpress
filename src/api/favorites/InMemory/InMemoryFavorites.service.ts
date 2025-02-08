import type { DetailedItem } from "@/types";
import { FavoritesEntity } from "../favorites.entity";
import { InMemoryFavoritesData } from "./InMemoryFavorites.data";

export class InMemoryFavoritesService extends FavoritesEntity {
  public getById(id: DetailedItem["id"]): DetailedItem {
    const item = InMemoryFavoritesData._getById(id);
    if (!item) {
      throw new Error(`No item with id ${id} in favorites`);
    }
    return item;
  }

  public getAll(): DetailedItem[] {
    const items = InMemoryFavoritesData._getAll();
    return items;
  }

  public save(item: DetailedItem): void {
    if (InMemoryFavoritesData._getById(item.id)) {
      throw new Error(`Item with id ${item.id} already exists in favorites`);
    }
    const savingItem: DetailedItem = { ...item, favorite: true };
    InMemoryFavoritesData._favoriteItems[item.id] = savingItem;
  }

  public delete(id: DetailedItem["id"]): void {
    if (!InMemoryFavoritesData._getById(id)) {
      throw new Error(`Item with id ${id} does not exists in favorites`);
    }
    delete InMemoryFavoritesData._favoriteItems[id];
  }
}
