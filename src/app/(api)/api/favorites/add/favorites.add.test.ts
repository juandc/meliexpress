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
        await expect(json).toStrictEqual({ data: null, error: null });
      },
    });
  });
});
