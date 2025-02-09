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

describe("remove favorites api", () => {
  it("DELETE returns 200", async () => {
    const itemsDict: Record<BaseItem["id"], BaseItem> = {};
    favoritesMock.items.forEach((item) => itemsDict[item.id] = item);
    InMemoryFavoritesData._favoriteItems = {};
    InMemoryFavoritesData._getAll = () => Object.values(itemsDict);
    InMemoryFavoritesData._getById = (id: BaseItem["id"]) => itemsDict[id];

    await testApiHandler({
      appHandler,
      params: { id: favoritesMock.items[0].id },
      test: async ({ fetch }) => {
        const response = await fetch({ method: "DELETE" });
        const json = await response.json();
        expect(response.status).toBe(200);
        await expect(json.data).toBeNull();
        await expect(json.error).toBeNull();
      },
    });
  });

  it("DELETE returns 404 when id is not in favorites", async () => {
    await testApiHandler({
      appHandler,
      params: { id: "nonexistent" },
      test: async ({ fetch }) => {
        const response = await fetch({ method: "DELETE" });
        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json.data).toBeNull();
        await expect(typeof json.error).toBe("string");
      },
    });
  });

  it("DELETE returns 400 when id is not sent", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: "DELETE" });
        const json = await response.json();
        expect(response.status).toBe(400);
        await expect(json.data).toBeNull();
        await expect(typeof json.error).toBe("string");
      },
    });
  });
});
