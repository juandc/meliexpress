import type { BaseItem } from "@/types";
import { FavoritesEntity } from "../favorites.entity";
import { InMemoryFavoritesData } from "./InMemoryFavorites.data";

export class InMemoryFavoritesService extends FavoritesEntity {
  public getById(id: BaseItem["id"]): BaseItem {
    const item = InMemoryFavoritesData._getById(id);
    if (!item) {
      throw new Error(`No item with id ${id} in favorites`);
    }
    return item;
  }

  public validateByIds(ids: BaseItem["id"][]): Record<BaseItem["id"], boolean> {
    const validated: Record<BaseItem["id"], boolean> = {};
    ids.forEach((id) => {
      const item = InMemoryFavoritesData._getById(id);
      validated[id] = !!item;
    });
    return validated;
  }

  public getAll(): BaseItem[] {
    const items = InMemoryFavoritesData._getAll();
    return items;
  }

  public save(item: BaseItem): void {
    if (InMemoryFavoritesData._getById(item.id)) {
      throw new Error(`Item with id ${item.id} already exists in favorites`);
    }
    const savingItem: BaseItem = { ...item, favorite: true };
    InMemoryFavoritesData._favoriteItems[item.id] = savingItem;
  }

  public delete(id: BaseItem["id"]): void {
    if (!InMemoryFavoritesData._getById(id)) {
      throw new Error(`Item with id ${id} does not exists in favorites`);
    }
    delete InMemoryFavoritesData._favoriteItems[id];
  }
}
