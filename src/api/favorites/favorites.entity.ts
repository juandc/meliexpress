import type { BaseItem } from "@/types";

export abstract class FavoritesEntity {
  public abstract getAll(): BaseItem[];
  public abstract getById(id: BaseItem["id"]): BaseItem;
  public abstract validateByIds(ids: BaseItem["id"][]): Record<BaseItem["id"], boolean>;
  public abstract save(item: BaseItem): void;
  public abstract delete(id: BaseItem["id"]): void;
}
