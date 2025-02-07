import { BaseItem, DetailedItem } from "./Item";

export type ApiAuthor = {
  name: string;
  lastname: string
};

export type SearchApi = {
  data: {
    author: ApiAuthor;
    categories: string[];
    items: BaseItem[];
  };
  error: null;
} | {
  data: null;
  error: unknown;
};

export type ItemApi = {
  data: {
    author: ApiAuthor;
    categories: string[];
    item: DetailedItem;
  };
  error: null;
} | {
  data: null;
  error: unknown;
};
