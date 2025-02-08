/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BaseItem, DetailedItem } from "@/types";
import { ItemsEntity } from "../items.entity";
import { InMemoryItemsData } from "./InMemoryItems.data";

export class InMemoryItemsService extends ItemsEntity {
  private _transformCategories(originalCategories: any) {
    const categories: string[] = originalCategories.map((c: any) => c.name) ?? [];
    return categories;
  }

  private _transformSearchCategories(original: any) {
    const originalCategories: string[] = original.filters
      ?.find((filter: any) => filter.id === "category")
      ?.values[0]
      ?.path_from_root ?? [];
    const categories = this._transformCategories(originalCategories);
    return categories;
  }

  private _transformBaseItem(originalItem: any): BaseItem {
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
    };
    return item;
  }

  private _transformDetailedItem(originalItem: any, dataDesc: any, isFavorite: boolean): DetailedItem {
    const baseItem = this._transformBaseItem(originalItem);
    const detailedItem: DetailedItem = {
      ...baseItem,
      sold_quantity: originalItem.initial_quantity, // TODO: ??
      description: dataDesc.plain_text,
      favorite: isFavorite,
    };
    return detailedItem;
  }

  private _transformSearchItems(original: any) {
    const items: BaseItem[] = original.results.map(this._transformBaseItem);
    return items;
  }

  public async getBySearch(query: string) {
    const original = await InMemoryItemsData.mockSearchResults(query);
    const categories = this._transformSearchCategories(original);
    const items = this._transformSearchItems(original);
    return { categories, items };
  }

  public async getById(id: string) {
    const { data, dataDesc, dataCategory } = await InMemoryItemsData.mockItem(id);
    let isFavorite = false;
    try {
      isFavorite = !!this._favoritesService.getById(id);
    } catch {
      isFavorite = false;
    }
    const categories = this._transformSearchCategories(dataCategory);
    const item = this._transformDetailedItem(data, dataDesc, isFavorite);
    return { categories, item };
  }
}
