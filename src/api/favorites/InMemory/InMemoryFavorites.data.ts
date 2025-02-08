/* In-memory persistence works terrible, especially in dev mode,
 * idk exactly what happens in Next.js HMR reload process,
 * but it makes memory crash, production should work well
 * (except the "problem" of the memory reset every time the server restarts),
 * even needed to change tsconfig.compilerOptions.module to CommonJS
 * to make it work
*/

import type { DetailedItem } from "@/types";

export class InMemoryFavoritesData {
  public static _favoriteItems: Record<DetailedItem["id"], DetailedItem> = {};

  public static _getAll(): DetailedItem[] {
    return Object.values(this._favoriteItems);
  }

  public static _getById(id: DetailedItem["id"]): DetailedItem | undefined {
    const item = this._favoriteItems[id];
    return item;
  }
}
