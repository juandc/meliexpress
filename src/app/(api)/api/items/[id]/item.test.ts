import { testApiHandler } from "next-test-api-route-handler";
import { ExternalApiRequestItemsService } from "@/api/items/ExternalApiRequest/ExternalApiRequestItems.service";
import * as appHandler from "./route";

jest.mock("@/api/items/ExternalApiRequest/ExternalApiRequestItems.service");

const mockGetById = jest.fn();
ExternalApiRequestItemsService.prototype.getById = mockGetById;

describe("item api", () => {
  afterEach(() => {
    mockGetById.mockReset();
    jest.clearAllMocks();
  });

  it("GET returns 404 when item is not found", async () => {
    mockGetById.mockResolvedValueOnce({ categories: [], item: {} });

    await testApiHandler({
      appHandler,
      params: { id: "nonexistent" },
      test: async ({ fetch }) => {
        const response = await fetch();
        expect(response.status).toBe(404);
        const json = await response.json();
        expect(json.error).toBe("Item Not Found");
      },
    });
  });

  it("GET returns 200 with item", async () => {
    const mockItem = { id: "1", title: "Item 1" };
    const mockCategories = ["Category 1"];
    mockGetById.mockResolvedValueOnce({
      categories: mockCategories,
      item: mockItem,
    });

    await testApiHandler({
      appHandler,
      params: { id: "1" },
      test: async ({ fetch }) => {
        const response = await fetch();
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.data.item).toEqual(mockItem);
        expect(json.data.categories).toEqual(mockCategories);
      },
    });
  });

  it("GET returns 500 on error", async () => {
    mockGetById.mockRejectedValueOnce(new Error("Internal Server Error"));

    await testApiHandler({
      appHandler,
      params: { id: "1" },
      test: async ({ fetch }) => {
        const response = await fetch({ method: "GET" });
        expect(response.status).toBe(500);
        const json = await response.json();
        expect(json.error).toBe("Internal Server Error");
      },
    });
  });
});
