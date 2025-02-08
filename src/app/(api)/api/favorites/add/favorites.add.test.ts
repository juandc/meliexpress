import { testApiHandler } from "next-test-api-route-handler";
import type { DetailedItem } from "@/types";
import * as appHandler from "./route";

describe("add favorites api", () => {
  it("POST returns 200", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const body: DetailedItem = {
          id: "example-1",
          title: "Example Detailer Item",
          price: {
            amount: 100,
            decimals: 100,
            currency: "AR",
          },
          picture: "http://example.com/image.jpg",
          condition: "new",
          free_shipping: true,
          description: "This is a detailed item description",
          sold_quantity: 1,
          favorite: false,
        };
        const response = await fetch({
          method: "POST",
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(200);
        const json = await response.json();
        await expect(json.data).toBeNull();
        await expect(json.error).toBeNull();
      },
    });
  });

  it("POST returns 400 when empty object body", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          body: JSON.stringify({}),
        });
        expect(response.status).toBe(400);
        const json = await response.json();
        await expect(json.data).toBeNull();
        await expect(typeof json.error).toBe("string");
      },
    });
  });
  it("POST returns 500 when no body is sent", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
        });
        expect(response.status).toBe(500);
        const json = await response.json();
        await expect(json.data).toBeNull();
        await expect(typeof json.error).toBe("string");
      },
    });
  });
});
