import { testApiHandler } from "next-test-api-route-handler";
import { ExternalApiRequestItemsService } from "@/api/items/ExternalApiRequest/ExternalApiRequestItems.service";
import * as appHandler from "./route";

jest.mock("@/api/items/ExternalApiRequest/ExternalApiRequestItems.service");

const mockGetBySearch = jest.fn();
ExternalApiRequestItemsService.prototype.getBySearch = mockGetBySearch;

describe("items api", () => {
  afterEach(() => {
    mockGetBySearch.mockReset();
    jest.clearAllMocks();
  });

  it("GET returns 400 when no query is provided", async () => {
    await testApiHandler({
      appHandler,
      url: "/api/items",
      test: async ({ fetch }) => {
        const response = await fetch();
        expect(response.status).toBe(400);
        const json = await response.json();
        expect(json.error).toBe("Not query in items search");
      },
    });
  });

  it("GET returns 404 when no items are found", async () => {
    mockGetBySearch.mockResolvedValueOnce({ categories: [], items: [] });

    await testApiHandler({
      appHandler,
      url: "/api/items?q=nonexistent",
      test: async ({ fetch }) => {
        const response = await fetch();
        expect(response.status).toBe(404);
        const json = await response.json();
        expect(json.error).toBe("Not Found");
      },
    });
  });

  it("GET returns 200 with items", async () => {
    const mockItems = [{ id: "1", title: "Item 1" }];
    const mockCategories = ["Category 1"];
    mockGetBySearch.mockResolvedValueOnce({
      categories: mockCategories,
      items: mockItems,
    });

    await testApiHandler({
      appHandler,
      url: "/api/items?q=item",
      test: async ({ fetch }) => {
        const response = await fetch();
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.data.items).toEqual(mockItems);
        expect(json.data.categories).toEqual(mockCategories);
      },
    });
  });

  it("GET returns 500 on error", async () => {
    mockGetBySearch.mockRejectedValueOnce(new Error("Internal Server Error"));

    await testApiHandler({
      appHandler,
      url: "/api/items?q=item",
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        expect(response.status).toBe(500);
        const json = await response.json();
        expect(json.error).toBe("Internal Server Error");
      },
    });
  });
});
