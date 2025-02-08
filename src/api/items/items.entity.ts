import type { BaseItem, DetailedItem } from "@/types";
import { FavoritesEntity } from "../favorites/favorites.entity";

export type ItemsSearchData = {
  categories: string[];
  items: BaseItem[];
};

export type DetailedItemData = {
  categories: string[];
  item: DetailedItem;
};

export abstract class ItemsEntity {
  // TODO: better way to inject deps ?
  public _favoritesService: FavoritesEntity;
  constructor(favoritesService: FavoritesEntity) {
    if (!(favoritesService instanceof FavoritesEntity)) {
      throw new Error(`favoritesService is not instance of FavoritesEntity`);
    }
    this._favoritesService = favoritesService;
  }
  public abstract getBySearch(query: string): Promise<ItemsSearchData>;
  public abstract getById(query: string): Promise<DetailedItemData>;
}
