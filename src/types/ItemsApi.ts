/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { NextResponse } from "next/server";
import type { BaseItem, DetailedItem } from "./Item";

export type SearchApiData = {
  categories: string[];
  items: BaseItem[];
};

export type ItemApiData = {
  categories: string[];
  item: DetailedItem;
};

export type FavoritesApiData = {
  items: DetailedItem[];
};


export type ApiAuthorData = {
  name: string;
  lastname: string;
};

export type ApiAuthor = {
  author: ApiAuthorData;
};


export type BaseApisData = SearchApiData | ItemApiData | FavoritesApiData;

export interface BaseApiWithData<T extends BaseApisData> {
  data: ApiAuthor & T;
  error: null;
};
export interface SearchApi extends BaseApiWithData<SearchApiData> {}
export interface ItemApi extends BaseApiWithData<ItemApiData> {}
export interface FavoritesApi extends BaseApiWithData<FavoritesApiData> {}

export type BaseApiError = string;
export interface ErrorApi {
  data: null;
  error: BaseApiError;
};


export type BaseApis = SearchApi | ItemApi | FavoritesApi;

export type NextResponseApi<T extends BaseApis> = NextResponse<T | ErrorApi>;
