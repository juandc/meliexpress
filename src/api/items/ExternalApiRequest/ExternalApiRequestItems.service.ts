/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseItem, DetailedItem } from "@/types";
import { ItemsEntity } from "../items.entity";
import { ExternalApiRequestItemsData } from "./ExternalApiRequestItems.data";

export class ExternalApiRequestItemsService extends ItemsEntity {
  private _transformCategories(originalCategories: any) {
    originalCategories ??= [];
    const categories: string[] = [...originalCategories].map(
      (c: any) => c.name
    ) ?? [];
    return categories;
  }

  private _transformBaseItem(originalItem: any): BaseItem {
    const price = originalItem.price.toFixed(2);
    const amount = Math.floor(originalItem.price);
    const decimals = price - amount;
    const item: BaseItem = {
      id: originalItem.id,
      title: originalItem.title,
      price: {
        currency: originalItem.currency_id,
        amount,
        decimals,
      },
      picture: originalItem.thumbnail,
      condition: originalItem.condition,
      free_shipping: originalItem.shipping.free_shipping,
      address_state: originalItem.address?.state_name ?? undefined,
      favorite: originalItem.favorite,
    };
    return item;
  }

  private _transformDetailedItem(originalItem: any, dataDesc: any): DetailedItem {
    const baseItem = this._transformBaseItem(originalItem);
    const detailedItem: DetailedItem = {
      ...baseItem,
      address_state: baseItem.address_state ?? originalItem.seller_address.state.name ?? undefined,
      sold_quantity: originalItem.initial_quantity / 2, // TODO: where is / how to calculate sold_quantity?
      description: dataDesc.plain_text,
    };
    return detailedItem;
  }

  private _transformSearchItems(originalResults: any) {
    const items: BaseItem[] = originalResults.map(this._transformBaseItem);
    return items;
  }

  private _addFavoriteToItems(originalItems: any) {
    const ids = originalItems.map((item: any) => item.id);
    const favoriteIds = this._favoritesService.validateByIds(ids);
    return originalItems.map((item: any) => ({ ...item, favorite: favoriteIds[item.id] }));
  }

  private _addFavoriteToItem(originalItem: any) {
    let isFavorite = false;
    try {
      isFavorite = !!this._favoritesService.getById(originalItem.id);
    } catch {
      isFavorite = false;
    }
    return { ...originalItem, favorite: isFavorite };
  }

  public async getBySearch(query: string) {
    const original = await ExternalApiRequestItemsData.originalSearchResults(query);
    const originalWithFavorites = this._addFavoriteToItems(original.results);
    const categories = this._transformCategories(original.categories.path_from_root);
    const items = this._transformSearchItems(originalWithFavorites);
    return { categories, items };
  }

  public async getById(id: string) {
    const { data, dataDesc, dataCategory } = await ExternalApiRequestItemsData.originalItem(id);
    const dataWithFavorite = this._addFavoriteToItem(data);
    const categories = this._transformCategories(dataCategory.path_from_root);
    const item = this._transformDetailedItem(dataWithFavorite, dataDesc);
    return { categories, item };
  }
}
