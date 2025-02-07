import { BaseItem } from "./Item";

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
