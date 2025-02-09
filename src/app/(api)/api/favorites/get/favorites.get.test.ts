import { testApiHandler } from "next-test-api-route-handler";
import type { BaseItem } from "@/types";
import { favoritesMock } from "@/mocks/favoritesMock";
import { InMemoryFavoritesData } from "@/api/favorites/InMemory/InMemoryFavorites.data";
import * as appHandler from "./route";

jest.mock("@/api/favorites/InMemory/InMemoryFavorites.data.ts", () => {
  return {
    __esModule: true,
    InMemoryFavoritesData: {
      _favoriteItems: {},
      _getAll: () => Object.values({}),
      _getById: () => undefined,
    },
  };
});

describe("get favorites api", () => {
  it("GET returns empty 200", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.data.items).toEqual([]);
        expect(json.error).toBeNull();
      },
    });
  });

  it("GET returns 200 with items", async () => {
    const itemsDict: Record<BaseItem["id"], BaseItem> = {};
    favoritesMock.items.forEach((item) => itemsDict[item.id] = item);
    InMemoryFavoritesData._favoriteItems = itemsDict;
    InMemoryFavoritesData._getAll = () => Object.values(itemsDict);

    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        const json = await response.json();
        expect(json.data.items).toEqual(favoritesMock.items);
      },
    });
  });
});
