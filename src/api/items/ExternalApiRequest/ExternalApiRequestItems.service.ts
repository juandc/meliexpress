/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseItem, DetailedItem } from "@/types";
import { ItemsEntity } from "../items.entity";
import { ExternalApiRequestItemsData } from "./ExternalApiRequestItems.data";

export class ExternalApiRequestItemsService extends ItemsEntity {
  private _transformCategories(originalCategories: any) {
    const categories: string[] = originalCategories.map((c: any) => c.name) ?? [];
    return categories;
  }

  private _transformBaseItem(originalItem: any, isFavorite: boolean): BaseItem {
    const item: BaseItem = {
      id: originalItem.id,
      title: originalItem.title,
      price: {
        currency: originalItem.currency_id,
        amount: originalItem.price,
        decimals: originalItem.price, // TODO: ??
      },
      picture: originalItem.thumbnail,
      condition: originalItem.condition,
      free_shipping: originalItem.shipping.free_shipping,
      favorite: isFavorite,
    };
    return item;
  }

  private _transformDetailedItem(originalItem: any, dataDesc: any, isFavorite: boolean): DetailedItem {
    const baseItem = this._transformBaseItem(originalItem, isFavorite);
    const detailedItem: DetailedItem = {
      ...baseItem,
      sold_quantity: originalItem.initial_quantity, // TODO: ??
      description: dataDesc.plain_text,
      favorite: isFavorite,
    };
    return detailedItem;
  }

  private _transformSearchItems(originalResults: any) {
    const items: BaseItem[] = originalResults.map((item: any) => this._transformBaseItem(item, item.favorite));
    return items;
  }

  public async getBySearch(query: string) {
    const original = await ExternalApiRequestItemsData.originalSearchResults(query);
    const ids = original.results.map((item: any) => item.id);
    const favoriteIds = this._favoritesService.validateByIds(ids);
    const originalWithFavorite = original.results.map((item: any) => ({ ...item, favorite: favoriteIds[item.id] }));
    const categories = this._transformCategories(original.categories.path_from_root);
    const items = this._transformSearchItems(originalWithFavorite);
    return { categories, items };
  }

  public async getById(id: string) {
    const { data, dataDesc, dataCategory } = await ExternalApiRequestItemsData.originalItem(id);
    let isFavorite = false;
    try {
      isFavorite = !!this._favoritesService.getById(id);
    } catch {
      isFavorite = false;
    }
    const categories = this._transformCategories(dataCategory.path_from_root);
    const item = this._transformDetailedItem(data, dataDesc, isFavorite);
    return { categories, item };
  }
}
