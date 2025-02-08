import type { DetailedItem } from "@/types";

export abstract class FavoritesEntity {
  public abstract getAll(): DetailedItem[];
  public abstract getById(id: DetailedItem["id"]): DetailedItem;
  public abstract save(item: DetailedItem): void;
  public abstract delete(id: DetailedItem["id"]): void;
}
